﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using NetworkLayerInterfaces;
namespace GUILayer
{
    public partial class MainMenu : Form
    {
        private INetwork endpoint;
        private IMainMenuNetwork mainMenu;
        private IGameBoardNetwork gameNetwork;
        

        public MainMenu(INetwork endpoint, IMainMenuNetwork mainMenu, IGameBoardNetwork gameNetwork)
        {
            this.endpoint = endpoint;
            this.mainMenu = mainMenu;
            this.gameNetwork = gameNetwork;
            InitializeComponent();
            this.mainMenu.MainMenuSetupSocket();
            this.SignIn.Click += new System.EventHandler(this.SignIn_Click);
            this.SignUp.Click += new System.EventHandler(this.SignUp_Click);
            this.CreateMatch.Click += new System.EventHandler(this.CreateMatch_Click);
            this.CreateMatch.Visible = false;
        }
       
        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void flowLayoutPanel1_Paint(object sender, PaintEventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void SignIn_Click(object sender, EventArgs e)
        {
            String nickname = this.Nickname.Text;
            String password = this.Password.Text;
            Console.WriteLine("Signing in: " + nickname + " " + password);
            if (this.mainMenu.MainMenuSignIn(nickname, password))
            {
                MessageBox.Show("Login Success");
                this.CreateMatch.Visible = true;
            }
            else
            {
                this.CreateMatch.Visible = false;
                MessageBox.Show("Login Failed, try again");
            }
        }

        private void SignUp_Click(object sender, EventArgs e)
        {
            String nickname = this.Nickname.Text;
            String password = this.Password.Text;
            Console.WriteLine("Signing up: " + nickname + " " + password);
            if (this.mainMenu.MainMenuSignUp(nickname, password))
                MessageBox.Show("signup successful for " + nickname);
            else
                MessageBox.Show("signup failed for " + nickname);
        }

        private void CreateMatch_Click(object sender, EventArgs e)
        {
            String nickname = this.Nickname.Text;
            String password = this.Password.Text;
            Console.WriteLine("Creating match: " + nickname + " " + password);
            EditGameBoard editGame = new EditGameBoard(this.gameNetwork);
            editGame.Show();
        }

        private void loadGameButton_Click(object sender, EventArgs e)
        {
            Console.WriteLine("Loading game...");

            GameBoard game = new GameBoard(this.gameNetwork);
            game.Show();
        }
    }
}
