# AnimeFlix
Netflix for Anime

# Motivation
This post is about creating an application similar to Netflix but for Anime only on Azure. We will be using most of the services and integrate them together to create application working on the cloud platform. Our application will be globally accessible and easy to use fast load time with static content delivered by CDN of Azure. Our application will be deployed in three parts of the world America, Europe, and Asia with restrictive development VM's and an expected billing report.

# Architecture

## Azure
![azurearchitecture](https://user-images.githubusercontent.com/13358738/123792979-f515b500-d900-11eb-8071-84e40c9d5a94.png)

# Prerequisites
1. Azure MySQL Server
2. Azure Storage Accounts
3. Azure CDN
4. Azure Virtual Machine
5. Azure Shared Gallery
6. Azure App Service
7. Azure Traffic Manager
8. Azure DNS Zones
9. Azure VNet

# Deployment steps
# Azure:

# MySQL Server:

Let’s build on Azure starting from MySQL Server. Search **Azure Database for MySQL server, Create Azure Database for MySQL Server, Single Server,** fill in the basic details, and hit **Review + create.**

![](https://miro.medium.com/max/700/1*RW8bAEcIdA1MTjdzQSd8Cw.png)

Your deployment shall be completed.

![](https://miro.medium.com/max/458/1*pkGqc85OhPecwX6ruZ21nw.png)

Keep note of the connection string as we will need them to connect with our application. Now, let's move on to the static files.

# Azure Storage Accounts:

Azure Storage Accounts provides us blob storage, file storage, queue, and table but amongst these four services, we will only be using blob storage to store our files. Go to **storage accounts, +Create,** fill in the basic details and hit **Review+create.**

![](https://miro.medium.com/max/700/1*XNuYybiAH14RQ5WoUdFVyw.png)

Your deployment shall be created.

![](https://miro.medium.com/max/415/1*G42IVw4tL8UkNcobEPFq4g.png)

Now, let’s add the movie files that we have previously put in the S3 storage. Firstly create a **Container** and upload files inside the **Container.**

![](https://miro.medium.com/max/700/1*rrRdSaIIeOFJpLm4POUnig.png)

Let’s check the stored files.

![](https://miro.medium.com/max/700/1*BCR7oEV1yP7kd1cgY3wIBg.png)

Now, we will serve it using CDN.

# CDN:

CDN is an alternative to AWS Cloudfront which does more or less the same. Select **CDN profiles, Create a CDN profile,** fill in the basic details, and hit **Create.** But there is an easier way. GO to the same **storage account, Security + networking, Azure CDN,** fill in the basic details, and hit **Review + Create.**

![](https://miro.medium.com/max/700/1*o2J6WKkknIBn4zaeXiqw5g.png)

Your deployment shall be created.

![](https://miro.medium.com/max/471/1*UT_NuBqR1wB65Rk4PA4iMg.png)

Let’s check whether the CDN is streaming our movie or not.

![](https://miro.medium.com/max/700/1*vclKYwAy9fMLzIRMjrm6iw.png)

As you can see our edge network is running smoothly. Keep all these links as we will integrate this with the application.

# Azure Virtual Machines:

Now we will need someplace to host our application and that would be on the Azure Virtual Machine. Go to **Virtual Machine, +Create,** fill in the basic details, and hit **Review + Create.**

![](https://miro.medium.com/max/700/1*rAQBKaIuPWfPs9pQFXnx8A.png)

Your deployment shall be completed.

Now follow the **STEPS** section in github, install the application, and check on the VM’s public IP address.

![](https://miro.medium.com/max/700/1*R-gSbR2oSqTfPxAz5Asvpg.png)

It worked, great. Now let’s create an image from it so it will be easy for us to create another instance like this later for global availability.

# Gallery:

Just like an AMI, we can also capture an image for the VM. Go to the **VM,** and **Capture** the image.

![](https://miro.medium.com/max/700/1*u7JZqV17ag81zs5aH6_fgA.png)

Fill in these basic details and hit **Review + create.**

![](https://miro.medium.com/max/700/1*zvUF6d72Sch4Cl1WuZX0SQ.png)

You shall see your image being deployed.

![](https://miro.medium.com/max/441/1*-XFTQRCtG1l63UQ9PpX8NQ.png)

Now we will use this image to deploy to another region with minimal effort. Click on the **+Create VM**

![](https://miro.medium.com/max/700/1*AG90MAGWabkpCoeV-KuuFQ.png)

But before that, we need to replicate the image. Click on **Settings, Update replication** and select North Europe and South East Asia.

![](https://miro.medium.com/max/700/1*L3SItPjEHJw4lDGEYpWaZg.png)

Now, select another region for the deployment and hit **Review + Create.**

![](https://miro.medium.com/max/700/1*2r-N674dIcfbDAPg2XrGow.png)

Our deployment shall be successful.

![](https://miro.medium.com/max/441/1*-XFTQRCtG1l63UQ9PpX8NQ.png)

Now we have 2 VM's. but wait, what about the European one. We will instead create an App service with our application for the European region. Before going further we need to create the DNS of the VM’s as the Traffic Manager takes DNS as the input. Go to the **VM’s,** **DNS Name(not configured),** enter the DNS name you would like, and hit **Save.**

![](https://miro.medium.com/max/700/1*Kw4OOtvurxqKP_8BofPHQA.png)

# App Service:

Let’s say that Vm is too much of a problem to manage, is there another solution for it. Yes, Azure App Service. Azure App Service is a PaaS service where we just upload our code and use the endpoint to access our application. To create, go to **App Services, Create app service,** fill in the basic details and hit **Review+Create.**

![](https://miro.medium.com/max/700/1*odnqX_6vaobOMJFU5gG7SQ.png)

Your deployment shall be completed

![](https://miro.medium.com/max/452/1*74I1HeCXPeOXX3PQH2AbOA.png)

Let’s check the URL and validate whether our application is running or not.

![](https://miro.medium.com/max/700/1*SWop-2Dyrq56ppuohh-hfg.png)

![](https://miro.medium.com/max/700/1*66NUd3P1LOeP-05w2xMAJA.png)

Great. Now we have 2 VM’s running on East and SEA and one App service in Europe. Let’s tie all these up with our Azure Traffic Manager.

# Azure Traffic Manager:

To load balance at the region level, we will use Azure Traffic Manager. To create, go to **Traffic Manager profiles, Create traffic manager profile,** fill in the basic details, and hit **Create.** We have used Latency as our Routing method.

![](https://miro.medium.com/max/381/1*8Umft_2HboZFZOoQwhBrIQ.png)

Now to add endpoints hit **Settings, Endpoints,** and fill the endpoint for the **VM’s** and **App Services.**

![](https://miro.medium.com/max/700/1*Fr4GdRG6G8jdfJCA6LNeAw.png)

Let’s hit our Traffic endpoint URL to check whether it’s load balancing at the global scale or not.

![](https://miro.medium.com/max/700/1*JUi-kz0JAikRosZc4LSAdg.png)

![](https://miro.medium.com/max/700/1*cVpigqljZqyZ00b-9dIsjA.png)

It’s working as we can watch the movie. Hence, we have globally scaled our application at scale.

# DNS Zones:

Let’s create a DNS record. Although I don’t have a domain registered, we can still create the record. Go to **DNS Zones, +Record Set,** connect our Traffic Manager with the RecordSet, and **OK.**

![](https://miro.medium.com/max/417/1*6tNz2OuMPcHUKQbLMXhQfg.png)

Congratulation, but there is still one more thing left. Of course, we won't code directly into our production server so for that reason we will be creating a private VNet with 2 instances living inside it.

# Azure VNet:

Azure Virtual Network is a network of Azure in the cloud. This VNet can be subdivided into different subnets. For this exercise, we will be creating one VNet with one subnet which is private and is not accessed to the internet. Click on **Virtual Networks, f**ill in the details, and hit **Review + create.**

![](https://miro.medium.com/max/700/1*Zk2l_wohkmnQlo0Obo-n8Q.png)

Your VNet shall be successfully deployed.

![](https://miro.medium.com/max/433/1*IylphsZqxP4ff20QuGwd4w.png)

Now we create an Azure Virtual Machine inside the VNet. For now, we will use the default Subnet. Click on **Azure Virtual Machine,** fill in the basic details, select the **VNet** that you have just created, and hit **Review + create.**

![](https://miro.medium.com/max/700/1*OIeazFxINi-N1tj7JgkrfA.png)

The deployment shall be completed successfully

![](https://miro.medium.com/max/455/1*oAQR-miXaHrY6hBW7vvfpw.png)

Shrestha, Sulabh. Creating a Netflix Dummy on both AWS and Azure 63. 2021. JPEG file.

# Billing:

Keeping track of billing is also a very important part of cloud computing. There are many small charges for Azure Blob Storage, Data Transfer, and so on, but there I will write about the expected bill for a month for these services.

Production VM (B1S) — 1*3 region = $7.592*3 = $22.776/month

Dev/Test EC2 Instance (B1S) — 2 = $7.592*2=$15.184/month

MYSQL (1vCore:2GBMib) — 1 = $24.48/month

Total = $62.44/month

# Steps
1 Follow these commands to run the application
```bash
git clone git@github.com:codexponent/animeflix.git

# # For backend
cd backend
pip install -r requirements.txt
pytrhon main.py

# # For Frontend
cd frontend/
npm install
npm run start
```
2. Configuration (config.ini for flask):
```bash
[MYSQL]
database = 
host = 
user = 
password =
```
3. Configuration (config.json for frontend [src/]):
```bash
{
    "vid_1": <CDN-Link-for-AWS-Azure>,
    "vid_2": <CDN-Link-for-AWS-Azure>,
    "vid_3": <CDN-Link-for-AWS-Azure>,
    "vid_4": <CDN-Link-for-AWS-Azure>,
    "vid_5": <CDN-Link-for-AWS-Azure>,
    "vid_6": <CDN-Link-for-AWS-Azure>
  }
```
4. I also have a Dockerfile for convienence
```bash
docker run -exec -it -p 80:80 -p 5000:5000 -p 3000:3000 --name webserver <image-here>
```
5. Crontab reboot script
```bash
#!/bin/bash
sudo docker stop webserver
sudo docker rm webserver
sudo docker run -exec -it -p 80:80 -p 5000:5000 -p 3000:3000 --name webserver <image-name>

(crontab -l 2>/dev/null; echo "@reboot <location-of-your-above-script>") | crontab -

```

