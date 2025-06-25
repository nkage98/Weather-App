import db from '../db.js';
import { v4 as uuidv4 } from 'uuid'; // library to generate uuid id 

export const newUser = async ({ name, email, phone }) => {
    const id = uuidv4(); // chances of id clash is very very low
    const sql = 'INSERT INTO users (id, name, email, phone) VALUES (?, ?, ?, ?)'; // sql query to add to users table
    const [result] = await db.execute(sql, [id, name, email, phone]); // insert data to db
    return {
        id,
        name,
        email,
        phone
    };
};

// get users from sql and if it has filters append then to sql query
export const getUsers = async (filters = {}, page = 1, limit = 20) => {
    let sql = 'SELECT * FROM users WHERE 1=1'; // base sql query
    const params = [];

    if (filters.name) {
        sql += ' AND name LIKE ?';
        params.push(`%${filters.name}%`);
    }

    if (filters.email) {
        sql += ' AND email LIKE ?';
        params.push(`%${filters.email}%`);
    }

    // order by name
    sql += ' ORDER BY name ASC';

    const offset = (page - 1) * limit;
    sql += ` LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`; // Here can cause security and data integrity problem, but i don't know how to solve right now

    const [rows] = await db.execute(sql, params);
    return rows;
};

// Count total filtered users to pagination
export const usersCount = async (filters = {}) => {
    let sql = 'SELECT COUNT(*) as total FROM users WHERE 1=1';
    const params = [];

    if (filters.name) {
        sql += ' AND name LIKE ?';
        params.push(`%${filters.name}%`);
    }

    if (filters.email) {
        sql += ' AND email LIKE ?';
        params.push(`%${filters.email}%`);
    }

    const [rows] = await db.execute(sql, params);
    return rows[0].total;
};

// search user by id in sql data
export const searchUserById = async (id) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await db.execute(sql, [id]);

    return rows[0] || null;
};

// delete user by ID in sql data
export const deleteUserById = async (id) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows > 0;
};
