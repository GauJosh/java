# create backup of user collection
print(db.getCollection('user_backup').drop( { writeConcern: { w: 1 } } ))

print(db.getCollection('user')
    .aggregate([
        { $out: 'user_backup' }
    ]))



#create user_tenant collection

print(db.getCollection('user').aggregate([
 {$match: {"accounts": {$elemMatch: {"_id": {$exists: true}, "tenantId": {$exists: false}}}}},
  { "$unwind" : "$accounts" },
  {$lookup: {
     "from": "account",
     "localField": "accounts._id",
     "foreignField": "_id",
      "as": "_account"
 }},
   { $set: { "accounts.tenantId": {$ifNull: [ {$arrayElemAt : [ "$_account.tenantId", 0 ] }, "runbuggy"] } }},


  { $unset: "_account" },
  { "$group" : {
         "_id": "$_id",
         "_user": { "$first": "$$ROOT" },
         "accounts" : {$push: "$accounts"},

  } },
  
  {
    "$replaceRoot": { "newRoot": { "$mergeObjects": ["$_user", { accounts: "$accounts" }]} }
  },
  
  { $merge: { into: "user_tenant", on: "_id", whenMatched: "replace", whenNotMatched: "insert" } }


  ],
  {allowDiskUse : true}
))



#merge user_tenant collection into user collection

print(db.getCollection('user_tenant').aggregate([
  {$match: {}},
  { $merge: { into: "user", on: "_id", whenMatched: "replace", whenNotMatched: "fail" } }

]))


#remove tenantId from the user

print(db.getCollection('user').update({}, {$unset: {tenantId:1}} , {multi: true}))


#recreate account_name_address_tenant index

print(db.getCollection("account").dropIndex("account_name_address_tenant"))
print(db.getCollection("account").createIndex(
  {
    "name" : 1,
    "address" : 1,
    "tenantId" : 1
  },
  {
    name: "account_name_address_tenant",
    unique: true
  }
))

#remove account_name_address index

print(db.getCollection("account").dropIndex( "account_name_address" ))


# drop any backup of account collection

print(db.getCollection('account_backup').drop( { writeConcern: { w: 1 } } ))

# create backup of account collection

print(db.getCollection('account')
    .aggregate([
        { $out: 'account_backup' }
    ]))

print(db.getCollection('account').update({ $or: [ {tenantId: {$exists: false}}, {tenantId: null} ] }, {$set: {tenantId:'runbuggy'}} , {multi: true}))
