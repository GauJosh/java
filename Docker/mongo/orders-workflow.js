# remove lastModifiedBy as it was imported as a String but in the code it should be User which impacts reading those entries

print(db.getCollection('setting').update({}, {$unset: {lastModifiedBy:1}} , {multi: true}))
print(db.getCollection('featureAccess').update({}, {$unset: {lastModifiedBy:1}} , {multi: true}))


# remove backup of TenantAware collections

print(db.getCollection('order_backup').drop( { writeConcern: { w: 1 } } ))
print(db.getCollection('orderFull_backup').drop( { writeConcern: { w: 1 } } ))
print(db.getCollection('transportationOrder_backup').drop( { writeConcern: { w: 1 } } ))
print(db.getCollection('transportationOrderFull_backup').drop( { writeConcern: { w: 1 } } ))
print(db.getCollection('vehicleTransferOrder_backup').drop( { writeConcern: { w: 1 } } ))
print(db.getCollection('vehicleTransferOrderFull_backup').drop( { writeConcern: { w: 1 } } ))
print(db.getCollection('taskConfig_backup').drop( { writeConcern: { w: 1 } } ))
print(db.getCollection('taskConfigVariableGroup_backup').drop( { writeConcern: { w: 1 } } ))
print(db.getCollection('payment_backup').drop( { writeConcern: { w: 1 } } ))
print(db.getCollection('payout_backup').drop( { writeConcern: { w: 1 } } ))
print(db.getCollection('charge_backup').drop( { writeConcern: { w: 1 } } ))

# create backup of TenantAware collections

print(db.getCollection('order')
    .aggregate([
        { $out: 'order_backup' }
    ]))

print(db.getCollection('orderFull')
    .aggregate([
        { $out: 'orderFull_backup' }
    ]))

print(db.getCollection('transportationOrder')
    .aggregate([
        { $out: 'transportationOrder_backup' }
    ]))

print(db.getCollection('transportationOrderFull')
    .aggregate([
        { $out: 'transportationOrderFull_backup' }
    ]))


print(db.getCollection('vehicleTransferOrder')
    .aggregate([
        { $out: 'vehicleTransferOrder_backup' }
    ]))

print(db.getCollection('vehicleTransferOrderFull')
    .aggregate([
        { $out: 'vehicleTransferOrderFull_backup' }
    ]))


print(db.getCollection('taskConfig')
    .aggregate([
        { $out: 'taskConfig_backup' }
    ]))


print(db.getCollection('taskConfigVariableGroup')
    .aggregate([
        { $out: 'taskConfigVariableGroup_backup' }
    ]))


print(db.getCollection('payment')
    .aggregate([
        { $out: 'payment_backup' }
    ]))

print(db.getCollection('payout')
    .aggregate([
        { $out: 'payout_backup' }
    ]))

print(db.getCollection('charge')
    .aggregate([
        { $out: 'charge_backup' }
    ]))


#add tenantId=runbuggy if tenantId is missing or tenantId is null


print(db.getCollection('order').update({ $or: [ {tenantId: {$exists: false}}, {tenantId: null} ] }, {$set: {tenantId:'runbuggy'}} , {multi: true}))
print(db.getCollection('orderFull').update({ $or: [ {tenantId: {$exists: false}}, {tenantId: null} ] }, {$set: {tenantId:'runbuggy'}} , {multi: true}))
print(db.getCollection('transportationOrder').update({ $or: [ {tenantId: {$exists: false}}, {tenantId: null} ] }, {$set: {tenantId:'runbuggy'}} , {multi: true}))
print(db.getCollection('transportationOrderFull').update({ $or: [ {tenantId: {$exists: false}}, {tenantId: null} ] }, {$set: {tenantId:'runbuggy'}} , {multi: true}))
print(db.getCollection('vehicleTransferOrder').update({ $or: [ {tenantId: {$exists: false}}, {tenantId: null} ] }, {$set: {tenantId:'runbuggy'}} , {multi: true}))
print(db.getCollection('vehicleTransferOrderFull').update({ $or: [ {tenantId: {$exists: false}}, {tenantId: null} ] }, {$set: {tenantId:'runbuggy'}} , {multi: true}))
print(db.getCollection('taskConfig').update({ $or: [ {tenantId: {$exists: false}}, {tenantId: null} ] }, {$set: {tenantId:'runbuggy'}} , {multi: true}))
print(db.getCollection('taskConfigVariableGroup').update({ $or: [ {tenantId: {$exists: false}}, {tenantId: null} ] }, {$set: {tenantId:'runbuggy'}} , {multi: true}))
print(db.getCollection('payment').update({ $or: [ {tenantId: {$exists: false}}, {tenantId: null} ] }, {$set: {tenantId:'runbuggy'}} , {multi: true}))
print(db.getCollection('payout').update({ $or: [ {tenantId: {$exists: false}}, {tenantId: null} ] }, {$set: {tenantId:'runbuggy'}} , {multi: true}))
print(db.getCollection('charge').update({ $or: [ {tenantId: {$exists: false}}, {tenantId: null} ] }, {$set: {tenantId:'runbuggy'}} , {multi: true}))
