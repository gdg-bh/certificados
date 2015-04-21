######################################################################
### Vagrant machine for MEAN stack dev, using angular-fullstack
### https://github.com/DaftMonk/generator-angular-fullstack
### additional configuration for windows and long file names
### Host : Windows 7.1 x64
### Guest : Ubuntu 14.04 x64
### Vagrant version 1.6.5
### Virtualbox version 4.3.20
######################################################################

### configuration starts here

# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
	# suppress stdin errors, more of a nuisance
	config.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"

	# Standard minimal Ubuntu box
	config.vm.box = "ubuntu/trusty64" # 14.04 64-bit
  
	# Configure VirtualBox VM
	config.vm.provider "virtualbox" do |v|
		v.memory = 1024
		# customise symlink behaviour
		# in windows also run in cmd "> fsutil behavior set SymlinkEvaluation L2L:1 R2R:1 L2R:1 R2L:1"
		v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant", "1"]
		v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/var_www_mean", "1"] # see below
	end

	# Forward Port 9000: for express
	config.vm.network :forwarded_port, guest: 9000, host: 9000

	# Port 35729 is required by LiveReload to reflect content changes
	# I had some problems with getting the vm to boot with this, disable if not needed
	# config.vm.network :forwarded_port, guest: 35729, host: 35729

	# default folder (next to this Vagrantfile) will be shared with the VM

	# create a 2nd share, which will map to /var/www/mean

	# notes: 
	# (1) Important! When Vagrant maps the folder in Virtualbox, it needs to "name" the Share
	#     the actual Share name will be, eg, var_www_mean (replacing the / with _)
	# (2) windows - note the forward slashes "/" or use "\\" under windows

	config.vm.synced_folder "c:/develop/phpprojects/mean", "/var/www/mean", create: true
	# config.vm.synced_folder "c:\\develop\\phpprojects\\mean", "/var/www/mean", create: true

	# attempt permissions: does this even work in windows? keep it for later
	# config.vm.synced_folder "c:\\develop\\phpprojects\\mean", "/var/www/mean",
	#  create: true,
	#	owner: "vagrant",
	#	group: "vagrant",
	#	mount_options: ["dmode=775,fmode=664"]

	# osx
	# config.vm.synced_folder "/Users/joebloggs/www", "/var/www/mean", create: true

	# create a private network, so that your client can access the host
	# the host will be 10.0.3.1 in this case, so you can access 
	# a web service via http://10.0.3.1:8888

	config.vm.network :private_network, ip: "10.0.3.2"

	# add the windows fix shell script
	config.vm.provision "file", source: "fix_win.sh", destination: "fix_win.sh"
	
	# run the provisioning
	config.vm.provision "shell", path: "provision.sh"
end
