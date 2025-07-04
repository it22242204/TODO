// todo-app/backend/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'mysql',
  user: 'root',
  password: 'password',
  database: 'todo_db',
  waitForConnections: true,
});

export default pool;
