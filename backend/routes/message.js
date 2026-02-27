import express from "express";
import supabase from "../config/supabaseClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===========================
   SEND MESSAGE
=========================== */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { receiver_id, content } = req.body;

    const { data, error } = await supabase
      .from("messages")
      .insert([{
        sender_id: req.user.id,
        receiver_id,
        content
      }])
      .select()
      .single();

    if (error) throw error;

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   GET CONVERSATION
=========================== */
router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(
        `and(sender_id.eq.${req.user.id},receiver_id.eq.${userId}),
         and(sender_id.eq.${userId},receiver_id.eq.${req.user.id})`
      )
      .order("created_at", { ascending: true });

    if (error) throw error;

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;