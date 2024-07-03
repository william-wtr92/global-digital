# 🔮 Global Digital - Hackaton

> Bold Digital Vision is a cutting-edge web platform designed to connect businesses with expert cybersecurity freelancers. Our platform offers a seamless interface where companies can post their cybersecurity projects and select from a pool of pre-verified, certified freelancers. Freelancers gain access to high-quality, well-paying opportunities that match their skills and expertise. Beyond matchmaking, the platform features collaboration tools, administrative management, and value-added services like continuous training. With a focus on security and compliance, Bold Digital Vision ensures a safe and efficient environment for both businesses and freelancers. Join us in revolutionizing the cybersecurity freelancing landscape.

## 🐐 Contributors

- [@William](https://github.com/william-wtr92) > Fullstack Developer / Team Leader
- [@Vincent](https://github.com/Limerio) > Fullstack Developer 
- [@Djibril](https://github.com/DjibrilNaji) > Fullstack Developer
- [@Charlotte](https://github.com/charlotte-waegeneire) > Data Scientist / Product Owner
- [@Ayoub](https://github.com/achla95) > SOC Analyst / Cybersecurity 
- [@Alexandre](https://github.com/Lindwen) > DevOps
- [@Magali](https://github.com/Magali-D) > DevOps


## 🔨 Setup

### 🐳 From Docker environment

- Make sure you have **Docker** installed on your machine.
- Setup ur **.env** file with the following
  variables -> [See example](https://github.com/william-wtr92/global-digital/blob/main/.env.example).

- To run this project clone this repository and run it locally using **docker commands**. <br><br>

    - **🚀 Compose - `Dev`:**
      ```bash
      pnpm run dev:compose
      ```


### 🔑 From the local environment

- You need to have **PNPM** installed, if not you can install it by following
  the [instructions](https://pnpm.io/installation).
- Setup ur **.env** file with the following
  variables -> [See example](https://github.com/william-wtr92/global-digital/blob/main/.env.example).
- Install [PostgreSQL](https://www.postgresql.org/download/)  on
  your local machine.
- Install the dependencies by running `pnpm install` at `root`.
- Start the `development server` by running the following commands at `root`:

  ##### **🖥️ Global Digital WepApp:**

  ```bash
  pnpm run dev
  ```

### **🔗 Access the project:** <br>

- **[WebApp](http://localhost:3000)** run on port `3000`

## ⭐️ Tech Stack

- **Client & Server:** [_Next.js_](https://nextjs.org/docs) & _TypeScript_
- **Database**: _PostgreSQL_
- **Mockup**: [_Figma_](https://www.figma.com/design/18DFWDRWH35U0rZGSd9QFp/Hackathon-2024---Bold-Digital)
- **CI/CD**: _Github Actions_
- **DevOps**: _K8s_ / _Helm_ / _Terraform_ / _Ansible_ / _ArgoCD_ / _HashiCorp Vault_
- **Containerization**: _Docker_

## 💡 Other Tools

- **Agile Methodology**: [_Jira_](https://supdevinci-vincent.atlassian.net/jira/software/projects/SH2/boards/1)

## 📝 License

> No part of this software may be reproduced, distributed, or transmitted in any form or by any means, including
> photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the
> author.
> For permission requests, write to the author at the email provided in the contact details.

> For more details, see the [LICENSE.md](LICENSE.md) file.
