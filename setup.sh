chmod +x setup_hooks.sh
sh setup_hooks.sh
npm install -g gulp
npm install
gulp deploy
echo "Setup complete, please run 'npm start' to start the application"
