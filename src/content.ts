export const site = {
  title: 'Waltzing in Tryst — DevOps Portfolio',
  tagline: 'DevOps • AWS • Docker • Git • Jenkins • Terraform • Ansible • Python • Powershell • Prometheus',
  email: 'jd.kelly803@gmail.com',
  location: 'Cheltenham, UK',
  resumeUrl: '/J-kellyCV_DO_25.pdf',
  logoUrl: '/logo.svg',
  social: {
    github: 'https://github.com/jadedjelly',
    linkedin: 'https://www.linkedin.com/in/johnkelly803/',
  },
  about: {
    blurb:
      'IT Manager with 20+ years’ experience in Azure and M365 cloud platforms, security, IAM, and enterprise application management. Proven ability to deliver automation, monitoring, CI/CD, and digital workplace solutions while ensuring system reliability, security, and compliance. Acts as senior escalation point and leads cross-functional collaboration to implement enterprise technology strategies.',
    highlights: [
      'AWS (EC2, ECR/ECS, EKS), DigitalOcean',
      'Docker, Compose, Kubernetes (Minikube, LKE, EKS)',
      'Helm & Helmfile, GitLab/GitHub Actions, Jenkins',
      'IaC with Terraform, networking & security basics',
      'Monitoring & metrics (Prometheus/Grafana)',
      'Node.js & Java builds, artifact mgmt (Nexus)',
    ],
  },
  experience: [
    {
    role: 'Devops Engineer & Writer',
      company: 'Waltzingintryst',
      period: '2023 - Present',
      location: 'Home - Cheltenham, England',
      bullets: [
        'Designed and deployed personal portfolio platform showcasing professional experience, tutorials, and technical reviews, using cloud-native and DevOps practices.',
        'Built and managed cloud infrastructure on AWS and DigitalOcean, including networking, security configuration, and artifact management with Nexus.',
        'Implemented containerization and orchestration by Dockerizing applications, running multi-service deployments with Docker Compose, and deploying workloads to Kubernetes (Minikube, Linode LKE, AWS EKS) with Helm/Helmfile.',
        'Established CI/CD pipelines with Jenkins (Freestyle, Multibranch, Pipeline) to automate build, test, and deployment workflows for Java and Node.js applications, integrating versioning, shared libraries, and GitLab webhooks.',
        'Provisioned infrastructure using Terraform (modularized deployments, remote state in S3) and integrated with Jenkins pipelines for full IaC-driven automation.',
        'Automated deployments and configuration management using Ansible; integrated Ansible with Terraform and Jenkins for complete stack automation.',
        'Implemented monitoring and observability with Prometheus and Grafana, creating dashboards and alerting rules for applications and containerized workloads.',
        'Developed Python & Boto3 automation scripts for AWS resource management (EC2, EKS, tagging, backups), uptime monitoring, and GitLab API integrations.',

      ],
    },
    {
        role: 'Senior System Engineer',
      company: 'Kioxia Technology ',
      period: '02/2025 - 07/2025',
      location: 'Onsite - Didcot, Oxfordshire',
      bullets: [
        'Led technical implementation of enterprise solutions across Linux, Windows, and Azure cloud environments.',
        'Developed and automated IAM solutions with Active Directory and Rocky IDM.',
        'Tracked computer system and network performance to identify root causes of issues.',
        'Administered and maintained multiple Linux distributions (Ubuntu, CentOS, Fedora, RHEL 7/8/9) and Windows 10/11, Server 2016 environments.',
        'Managed Ansible and playbooks to automate system configuration and deployments.',
        'Oversaw collaboration platforms including Jira, Confluence, and Bitbucket.',
        'Configured and maintained Aruba Wi-Fi.',
        'Implemented and maintained patch management across Windows and Linux systems.',
        'Administered enterprise backup solutions to safeguard business continuity.',
        'Built and maintained VMs via vSphere, ensuring reliable virtualization infrastructure.',
        'Leveraged Lansweeper for asset reporting and software deployments.',
        'Secured endpoints with Symantec and CrowdStrike, including encryption management.',
        'Administered and optimized SQL Server environments.',
      ],
    },
    {
      role: 'IT Operations Manager',
      company: 'Arkk Solutions',
      period: '11/2019 to 09/2023',
      location: 'Hybrid - London, England',
      bullets: [
        'Managed enterprise Azure & M365 digital workplace stack (Entra ID, Intune, Defender, Teams, SharePoint, Azure Monitor, Azure Purview) providing daily management, escalations, and incident response.',
        'Implemented Microsoft security baselines and Defender policies to strengthen compliance with ISO27001 standards.',
        'Exposure to Azure Virtual Desktop (AVD) in managing digital workplace environments.',
        'Implemented automation and monitoring tools (SolarWinds & Azure Monitor) to ensure reliability, security, and performance.',
        'Upgraded hardware and software with Heimdal, maintaining system performance and reducing downtime.',
        'Streamlined IT support by replacing Jira tickets with a Teams webhook, improving response times.',
        'Managed mixed environments: Windows 10/11, Windows Server 2016/2019, macOS, and iOS.',
        'Administered enterprise platforms: EntraID, Intune, Azure Sentinel, Defender, CrowdStrike, Zscaler, O365, and Jamf.',
        'Automated routine tasks with PowerShell (user lifecycle, mailbox permissions, system updates, reporting).',
        'Built and maintained an asset management system covering the full technology landscape.',
        'Deployed new technologies with minimal workflow disruption.',
        'Strengthened system security through regular testing, monitoring, and updates.',
        'Controlled budgets by negotiating vendor contracts and sourcing cost-effective solutions.',
        'Partnered with business managers and staff to align IT services with operational needs.',
        'Evaluated and introduced emerging technologies to enhance efficiency and security.',
        'Produced clear documentation and user guides, ensuring smooth adoption and knowledge transfer.',
      ],
    },
    {
      role: 'Onsite IT Engineer',
      company: 'Netstar MSP',
      period: '03/2019 to 11/2019',
      location: 'Onsite - London, England',
      bullets: [
        'Monitored computer systems and networks, diagnosing root causes of issues and ensuring uptime.',
        'Delivered prompt support across internal and customer-facing IT infrastructure.',
        'Installed, configured, and maintained multiplatform technologies for reliable performance.',
        'Resolved faults across servers, routers, and end-user hardware.',
        'Performed hardware installations and upgrades to keep systems secure and functional.',
        'Supported ~100 users daily, answering hardware/software queries and troubleshooting issues.',
        'Managed deployment and implementation of new software, systems, and solutions.',
        'Installed and maintained software, monitoring version control and patch updates.',
        'Established and troubleshot network and data communication systems.',
        'Investigated and resolved hardware issues within defined SLAs.',
        'Set up employee workspaces with computers, monitors, cabling, and peripherals.',
        'Built and enforced a robust patching regime for servers, storage, network, and desktops.',
        'Produced clear, user-friendly guidance to help staff understand technical processes.',
      ],
    },
    {
      role: 'Lead Engineer',
      company: 'Dolfin Financial Group',
      period: '02/2017 to 03/2019',
      location: 'Onsite - London, England',
      bullets: [
        'Reported directly to the IT Manager, acting as the senior escalation point for complex technical issues.',
        'Installed and maintained software across the business, overseeing version control and patch compliance.',
        'Led hardware deployments and upgrades, ensuring systems remained secure and operational.',
        'Prepared staff equipment, including workstation setup, cabling, operating systems, and software.',
        'Monitored system and network performance, diagnosing root causes and driving resolutions.',
        'Maintained internal and external websites to maximize availability and usability.',
        'Oversaw Jira ticket workflows, ensuring accurate documentation and timely issue resolution.',
        'Partnered with programmers and developers, providing technical input to optimize designs.',
        'Translated complex technical concepts into clear, user-friendly guidance for end users.',
        'Organized and optimized employee workspaces with hardware, peripherals, and connectivity.',
        'Mentored junior engineers, identifying skill gaps, providing hands-on training, and supporting career development.',
      ],
    },
    {
      role: 'IT Support Engineer',
      company: 'Westgroup Investments Limited',
      period: '02/2015 to 02/2017',
      location: 'Onsite - London, England',
      bullets: [
        'Installed and upgraded hardware to maintain secure and reliable system performance.',
        'Deployed and maintained user software, monitoring patching and version compliance.',
        'Performed upgrades on network servers, including operating systems and business-critical applications.',
        'Diagnosed and resolved network issues, minimizing downtime and disruption.',
        'Provided end-user support, troubleshooting hardware and software problems effectively.',
        'Configured routers, switches, and firewalls to support LAN, WAN, and wireless infrastructure.',
        'Prepared staff equipment, including workstation setup, cabling, operating systems, and software installations.',

      ],
    },
  ],
  projects: [
          {
            name: 'DisciplineEngine',
            link: 'https://github.com/jadedjelly/Windows_game_blocker', // or a live URL; omit to show plain text
            description: 'Designed and deployed a Windows-native application to enforce time-based restrictions on resource-heavy applications (Steam, Battle.net).',
            tags: ['Devops', 'Python', 'WindowsAutomation', 'SelfImprovement'], // drives the filter buttons
          }
        {
          name: 'Customizable Browser Governance Extension',
          link: 'https://github.com/jadedjelly/FF_Ext_Blocker', // or a live URL; omit to show plain text
          description: 'A Firefox extension that enforces time-based website access policies using a configurable whitelist — built for focus, discipline, and DevOps-driven browser governance.',
          tags: ['Governance', 'Workplace automation', 'Javascript'], // drives the filter buttons
        }
      {
        name: 'Rebuilding Devop projects',
        link: 'https://github.com/jadedjelly', // or a live URL; omit to show plain text
        description: 'Rebuilding projects, to wrap in with blog posts & aiding other like minded people',
        tags: ['Kubernetes', 'GitOps', 'Terraform', 'Ansible', 'Python', 'Nexus', 'Jenkins', 'Docker'], // drives the filter buttons
      },
    {
      name: 'Waltzing in Tryst — DevOps Portfolio',
      link: 'https://github.com/jadedjelly/WIT-Site',
      description: 'Modern portfolio/blog: React + TS, Tailwind dark mode, markdown posts, tag filters, Dockerized for Netlify.',
      tags: ['React', 'Tailwind', 'Markdown', 'Docker', 'AWS'],
},

    {
      name: 'Rebuilding Devop projects',
      link: 'https://github.com/jadedjelly', // or a live URL; omit to show plain text
      description: 'Rebuilding projects, to wrap in with blog posts & aiding other like minded people',
      tags: ['Kubernetes', 'GitOps', 'Terraform', 'Ansible', 'Python', 'Nexus', 'Jenkins', 'Docker'], // drives the filter buttons
    },


  ],
}

export type Post = {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  body: string
}
