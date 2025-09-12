-- Fix RLS policies for messages table
-- This script fixes the contact form by ensuring anyone can insert messages

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can insert messages" ON messages;
DROP POLICY IF EXISTS "Authenticated users can read messages" ON messages;

-- Create new policies
CREATE POLICY "Allow public insert on messages" ON messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow authenticated read on messages" ON messages 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Verify the policies are working
-- You can test this by running:
-- SELECT * FROM messages; -- Should work if authenticated
-- INSERT INTO messages (name, email, message) VALUES ('Test', 'test@example.com', 'Test message'); -- Should work for anyone
