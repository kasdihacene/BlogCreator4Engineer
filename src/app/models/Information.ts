export class Information {

    public presentation: string;
    public skills: {};
    public address: {};

    constructor() {

        this.presentation = "Fullstack software craftsman";
        
        this.skills = [
            { line: "Development languages", samples: ["Java", "C#", "Javascript", "Typescript", "Powershell", "Bash"] },
            { line: "Spring Framworks", samples: ["Spring cloud config", "Spring security", "Spring JPA"] },
            { line: "Spring Framworks", samples: ["mongoDB", "Oracle", "SQL Server", "PostgreSQL"] },
            { line: "Code quality & CI/CD", samples: ["Jenkins", "SonarQube", "Git", "maven", "Nexus"] }]

        this.address = {
            countryAddress: "Paris, France.",
            mailAddress: "pro-contact@hacene-blog.fr",
            webSite: "www.hacene-blog.fr"
        }

    }
}