#clear current TenantAware collection
#use clear collection to preserve indexes instead of rename collection which will create a new collection from the backup if the collection is not there when using aggregation to create the collection

print(db.getCollection('order').deleteMany({}))
print(db.getCollection('orderFull').deleteMany({}))
print(db.getCollection('transportationOrder').deleteMany({}))
print(db.getCollection('transportationOrderFull').deleteMany({}))
print(db.getCollection('vehicleTransferOrder').deleteMany({}))
print(db.getCollection('vehicleTransferOrderFull').deleteMany({}))
print(db.getCollection('taskConfig').deleteMany({}))
print(db.getCollection('taskConfigVariableGroup').deleteMany({}))
print(db.getCollection('payment').deleteMany({}))
print(db.getCollection('payout').deleteMany({}))
print(db.getCollection('charge').deleteMany({}))



# restore from original collection
print(db.getCollection('order_backup')
    .aggregate([
        { $out: 'order' }
    ]))

print(db.getCollection('orderFull_backup')
    .aggregate([
        { $out: 'orderFull' }
    ]))

print(db.getCollection('transportationOrder_backup')
    .aggregate([
        { $out: 'transportationOrder' }
    ]))

    
print(db.getCollection('transportationOrderFull_backup')
    .aggregate([
        { $out: 'transportationOrderFull' }
    ]))
    
    
print(db.getCollection('vehicleTransferOrder_backup')
    .aggregate([
        { $out: 'vehicleTransferOrder' }
    ]))


print(db.getCollection('vehicleTransferOrderFull_backup')
    .aggregate([
        { $out: 'vehicleTransferOrderFull' }
    ]))    
    
    
print(db.getCollection('taskConfig_backup')
    .aggregate([
        { $out: 'taskConfig' }
    ]))
    
print(db.getCollection('taskConfigVariableGroup_backup')
    .aggregate([
        { $out: 'taskConfigVariableGroup' }
    ]))
    

print(db.getCollection('payment_backup')
    .aggregate([
        { $out: 'payment' }
    ]))
    
    
print(db.getCollection('payout_backup')
    .aggregate([
        { $out: 'payout' }
    ]))
    
    
print(db.getCollection('charge_backup')
    .aggregate([
        { $out: 'charge' }
    ]))