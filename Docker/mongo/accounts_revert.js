#clear current user collection
#use clear collection to preserve indexes instead of rename collection which will create a new collection from the backup if the user collection is not there
print(db.getCollection('user').deleteMany({}))

# restore from user_backup collection
print(db.getCollection('user_backup')
    .aggregate([
        { $out: 'user' }
    ]))


#revert account collection
print(db.getCollection('account').deleteMany({}))

# restore from account_backup collection
print(db.getCollection('account_backup')
    .aggregate([
        { $out: 'account' }
    ]))