#!/usr/bin/env bash

echo "******************** SUDO provisioning"
echo "----> Self update apt-get"

# add for latest mongodb
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list

# update apt
apt-get update -y
#apt-get upgrade -y # upgrade if you like, optional

echo "----> Install openssl, libssl-dev, curl, git, build-essential"
apt-get install -y openssl libssl-dev curl git
apt-get install -y build-essential

echo "----> Installing & Starting mongodb"
apt-get install -y mongodb-org
#service mongodb start # should already be running

echo "----> Installing ruby and sass support"
apt-get install ruby-dev
gem install compass --no-ri --no-rdoc
# gem install sass # probably optional, compass should suffice

echo "----> Install NVM - Node Version Manager as vagrant user"
export HOME=/home/vagrant
curl --retry 2 https://raw.githubusercontent.com/creationix/nvm/v0.20.0/install.sh | bash
echo "source ~/.nvm/nvm.sh" >> /home/vagrant/.bashrc
source /home/vagrant/.nvm/nvm.sh
#nvm install 0.8
nvm install 0.10
#nvm install 0.11
nvm alias default 0.10

export HOME=/home/root
# Set Environment Variables for root
echo "Setting environment variables..."
echo "export NODE_ENV=development" >> /home/vagrant/.bashrc
echo "cd /vagrant" >> /home/vagrant/.bashrc

# NPM package install
echo "Installing NPM packages..."
echo "PATH=$PATH:/vagrant/node_modules/.bin" >> /home/vagrant/.bashrc

PATH=$PATH:/vagrant/node_modules/.bin

# this does some cleanup
cd /vagrant && rm -rf node_modules
[ -f package.json ] && npm install

echo "************* PROVISON for npm"
echo "----> NPM self update"
npm update -g npm

echo "----> Install Express JS"
npm install -g express-generator

echo "----> install yo, bower and grunt"
npm install -g yo bower grunt-cli

echo "----> Installing Angular fullstack generator"
npm install -g generator-angular-fullstack

echo "---> Fix up Permissions"
# Clean up permissions
chown -R vagrant:vagrant /home/vagrant/.nvm
#chown -R vagrant:vagrant /home/vagrant/tmp # this tmp doesn't seem to be created

mkdir -p /home/vagrant/mean
mv /home/vagrant/fix_win.sh /home/vagrant/mean
chmod +x /home/vagrant/mean/fix_win.sh
chown -R vagrant:vagrant /home/vagrant/mean

#echo "----> Installing protractor for end to end testing"
npm install -g protractor

#echo "Install the selenium webdriver"
webdriver-manager update