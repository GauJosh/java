print(db.getCollection('view').updateMany({_id: {$in: ['t-available', 't-unassigned']}}, {$set: {"roles": [
    "RUNBUGGY_ADMIN",
    "RUNBUGGY_OPERATIONS",
    "RUNBUGGY_MANAGER",
    "RUNBUGGY_SUPER_ADMIN",
    "RUNBUGGY_SYSTEM",
    "TRANSPORTER_ADMIN",
    "TRANSPORTER_USER",
    "TRANSPORTER_TRIAL_ADMIN"
  ]}}))
