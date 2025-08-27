import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import express from 'express';
import cors from 'cors';
const supabaseUrl = 'https://uoxdwplzotzfubusfiek.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const conn= express();
conn.use(cors());
conn.use(express.json());


conn.get('/votes/:id', async (req, res) =>{
    const { id} =req.params;
    const {data,error} =await supabase
        .from('votes')
        .select('vote')
        .eq('cat',id)
        .single()
    if (error){
        return res.status(500).json({error: error.message});
    }
    else{
        res.json(data);
    }
})
conn.post('/votes/:id', async (req, res) =>{
    const { id} =req.params;
    const {data,error} =await supabase
        .from('votes')
        .update({vote : req.body.vote})
        .eq('cat',id)
        .select('vote')
        .single()
    if (error){
        return res.status(500).json({error: error.message});
    }
    else{
        res.json(data);
    }
})
conn.listen(3000);