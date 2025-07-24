import mongoose from 'mongoose'

const connection: { isConnected?: number } = {}

export async function dbConnect() {
  if (connection.isConnected) {
    console.log('already connected!!')
    return
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '')
    connection.isConnected = db.connections[0].readyState
    console.log('DB connected success')
  } catch (error) {
    console.error('database conn failed', error)
    throw error
  }
}
