-- Fix messages table DELETE policy
-- This script adds the missing DELETE policy for authenticated users

-- Add DELETE policy for messages table
CREATE POLICY "Authenticated users can delete messages" ON messages 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- Verify the policy was created
-- You can test this by running:
-- SELECT * FROM pg_policies WHERE tablename = 'messages';
