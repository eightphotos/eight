import { drizzle } from 'drizzle-orm/postgres-js'
import postgres, { type Sql } from 'postgres';
import schema from "../schema";


// This implementation is a copy of the one done in Nibmus Storage. https://github.com/nimbusdotstorage/Nimbus/blob/main/packages/db/src/index.ts

const createDrizzle = (conn: Sql) => drizzle(conn, { schema });

export const createDb = (url: string) => {
  try {
    console.log('Creating database connection...');
    
    // Configure postgres.js for Cloudflare Workers compatibility
    const conn = postgres(url, {
      prepare: false, // Disable prepared statements for Workers compatibility
      transform: undefined, // Disable transform for compatibility
      ssl: url.includes('ssl=true') || url.includes('sslmode=require'),
      connection: {
        application_name: 'eight-server'
      }
    });
    
    const db = createDrizzle(conn);
    console.log('Database connection created successfully');
    return { db, conn };
  } catch (error) {
    console.error('Failed to create database connection:', error);
    throw error;
  }
};

export type DB = ReturnType<typeof createDrizzle>;



