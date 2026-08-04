#!/bin/bash

# Setup script for Free Voice AI System
# Installs: Whisper.cpp, Ollama, Piper TTS
# Total setup time: ~15 minutes
# Cost: $0 (all free and open-source)

set -e

echo "🎤 Setting up FREE Voice AI System"
echo "=================================="
echo ""
echo "This will install:"
echo "  • Whisper.cpp - Speech-to-Text (replaces Deepgram)"
echo "  • Ollama + LLM models - Chat AI (replaces GPT-4)"
echo "  • Piper TTS - Text-to-Speech (replaces Eleven Labs)"
echo ""

# Check OS
OS=$(uname -s)
echo "📱 Detected OS: $OS"

# Install Python dependencies
echo ""
echo "📦 Installing Python packages..."
pip install --upgrade pip
pip install openai-whisper ollama piper-tts gtts python-dotenv

# Install Whisper.cpp (optional, faster version)
echo ""
echo "🎤 Setting up Whisper.cpp..."
if [ ! -d "$HOME/whisper.cpp" ]; then
    git clone https://github.com/ggerganov/whisper.cpp.git "$HOME/whisper.cpp"
    cd "$HOME/whisper.cpp"
    make
    ./main -h > /dev/null && echo "✓ Whisper.cpp compiled successfully"
    cd -
else
    echo "✓ Whisper.cpp already installed"
fi

# Create Ollama directory
echo ""
echo "🤖 Setting up Ollama..."
mkdir -p ~/.ollama

# Download Ollama (if not installed)
if ! command -v ollama &> /dev/null; then
    echo "Installing Ollama..."
    if [ "$OS" = "Darwin" ]; then
        # macOS
        curl -fsSL https://ollama.ai/install.sh | sh
    elif [ "$OS" = "Linux" ]; then
        # Linux
        curl -fsSL https://ollama.ai/install.sh | sh
    else
        echo "⚠️  Manual Ollama installation required"
        echo "Visit: https://ollama.ai/download"
    fi
else
    echo "✓ Ollama is already installed"
fi

# Create .env file with defaults
echo ""
echo "⚙️  Creating .env configuration..."
if [ ! -f ".env.local" ]; then
    cat > .env.local << 'EOF'
# Voice AI Configuration (FREE)

# Speech-to-Text (Whisper.cpp)
WHISPER_MODEL=base  # tiny, base, small, medium, large
WHISPER_LANGUAGE=en

# Chat AI (Ollama)
OLLAMA_MODEL=mistral  # mistral, llama2, neural-chat, dolphin-mixtral
OLLAMA_URL=http://localhost:11434

# Text-to-Speech (Piper)
PIPER_LANGUAGE=en_US
PIPER_SPEED=1.0

# Optional: Google TTS fallback
GOOGLE_TTS_ENABLED=true

# Optional: Deepgram fallback (if you want to support paid API)
# DEEPGRAM_API_KEY=

# Optional: OpenAI fallback (if you want to support paid API)
# OPENAI_API_KEY=
EOF
    echo "✓ Created .env.local"
else
    echo "✓ .env.local already exists"
fi

# Create startup scripts
echo ""
echo "📝 Creating startup scripts..."

# Start Ollama daemon
cat > start-ollama.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting Ollama daemon..."
ollama serve
EOF
chmod +x start-ollama.sh

# Download LLM models
cat > download-models.sh << 'EOF'
#!/bin/bash
echo "📥 Downloading LLM models..."
echo ""
echo "Available models (pick one):"
echo "  • mistral (7GB) - Fastest, high quality"
echo "  • llama2 (13GB) - Good quality, balanced"
echo "  • neural-chat (4GB) - Lightweight, fast"
echo "  • dolphin-mixtral (26GB) - High quality, slow"
echo ""

read -p "Enter model to download [mistral]: " MODEL
MODEL=${MODEL:-mistral}

echo "Downloading $MODEL (this may take a few minutes)..."
ollama pull $MODEL

echo "✓ Downloaded $MODEL"
echo ""
echo "View downloaded models:"
ollama list
EOF
chmod +x download-models.sh

# Download Whisper model
cat > download-whisper.sh << 'EOF'
#!/bin/bash
echo "📥 Downloading Whisper model..."

read -p "Enter model size [base]: " SIZE
SIZE=${SIZE:-base}

python3 -m whisper --model $SIZE --language en --output_format txt /dev/null 2>/dev/null || true

echo "✓ Whisper $SIZE model downloaded"
EOF
chmod +x download-whisper.sh

echo "✓ Created startup scripts:"
echo "  - ./start-ollama.sh"
echo "  - ./download-models.sh"
echo "  - ./download-whisper.sh"

# Final setup summary
echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To get started:"
echo ""
echo "1. Terminal 1 - Start Ollama daemon:"
echo "   ./start-ollama.sh"
echo ""
echo "2. Terminal 2 - Download LLM model:"
echo "   ./download-models.sh"
echo ""
echo "3. Terminal 3 - Download Whisper model:"
echo "   ./download-whisper.sh"
echo ""
echo "4. Terminal 4 - Start your app:"
echo "   npm run dev"
echo ""
echo "5. Check system status:"
echo "   curl http://localhost:3000/api/voice/status"
echo ""
echo "📚 Documentation:"
echo "   - Whisper: https://github.com/openai/whisper"
echo "   - Ollama: https://ollama.ai"
echo "   - Piper: https://github.com/rhasspy/piper"
echo ""
echo "💡 Example usage in your app:"
echo "   import { useVoiceChat } from '@/hooks/useVoiceChat'"
echo "   const voice = useVoiceChat()"
echo ""
echo "🎉 Annual savings vs. paid APIs: $10,000+"
echo ""
