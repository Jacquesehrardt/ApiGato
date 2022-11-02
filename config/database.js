export default {
    dialect: 'postgres',
    host: 'ec2-44-207-126-176.compute-1.amazonaws.com',
    username: 'bhfcfsevvmdbbp',
    password: 'c9cc8ca3d611ce9a71eb8ebfd42192be1d4bfb808144edfb93343b5db9e0433f',
    database: 'dfbqat78h40lrl',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    },
  }