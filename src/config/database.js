import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
        logging: false
    }
);

sequelize.authenticate()
    .then(() => console.log('Conexión a MySQL establecida correctamente'))
    .catch(err => console.error('Error de conexión a MySQL:', err));

export default sequelize;