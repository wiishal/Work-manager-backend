# 🧠 Local Gemma LLM with Node.js & Nginx

This project runs a local **Gemma LLM** using `llama.cpp`, connect it through a **Node.js middleware**, and expose it using **Nginx`.

The Node.js service sits between your backend and the LLM and acts as a controlled AI layer.

---

## Architecture

Client / Backend
↓
Nginx
↓
Node.js AI Service
↓
llama.cpp (Gemma LLM)

---

## Features

- Fully local LLM (no cloud APIs)
- OpenAI-compatible `/v1/chat/completions` endpoint
- Node.js middleware for AI calls
- Nginx reverse proxy
- Streaming responses supported
- Works on low-RAM systems with quantized models

---

## Requirements

- Linux (recommended)
- Node.js v18+
- Nginx
- llama.cpp (built locally)
- Gemma GGUF model

---




## Run Gemma LLM

```bash
./build/bin/llama-server \
  -m models/gemma-3-1b-it-qat-GGUF/gemma-3-1b-it-qat-Q4_0.gguf \
  --ctx-size 1024 \
  --threads 2 \
  --batch-size 64 \
  --temp 0.2 \
  --top-p 0.9 \
  --port 8080


```


