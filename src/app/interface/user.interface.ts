export interface UserInterface {
    id: string | null
    headline: string | null
    email: string | null
    role: number | null
    profile_picture: string | null
    firstname: string | null
    lastname: string | null
    summary: string | null
    mobile: string | null
    sex: string | null
    current_status: any
    profile_viewers: number | null
    active_search: boolean
    domicile: string | null
    date_of_birth: string | null
    work_pref_status: string | null
    salary: string | null
    createdAt: string | null
    updatedAt: string | null
    experiences: Experience[]
    educations: Education[]
    attachments: Attachments
    socials: Socials
    skills: Skill[]
    config: Config
    YoE: number | null
  }
  
  export interface Experience {
    id: string
    exp_position: string
    exp_type: string
    exp_orgname: string
    exp_time: string
    exp_startdate: string
    exp_enddate?: string
    exp_description: string
    exp_location: string
    exp_status: string
    createdAt: string
    updatedAt: string
    ownerId: string
  }
  
  export interface Education {
    id: string
    edu_type: string
    edu_program: string
    edu_faculty: any
    edu_institution: string
    edu_gpa: string
    edu_startdate: string
    edu_enddate: string
    edu_description: string
    edu_location?: string
    edu_status?: string
    createdAt: string
    updatedAt: string
    ownerId: string
  }
  
  export interface Attachments {
    id: string
    atc_resume: string | null
    atc_portfolio: string | null
    createdAt: string
    updatedAt: string
    ownerId: string
  }
  
  export interface Socials {
    id: string
    twitter: string
    instagram: string
    linkedin: string
    behance: string
    github: string
    youtube: string
    createdAt: string
    updatedAt: string
    ownerId: string
  }
  
  export interface Skill {
    id: string
    skill: string
    createdAt: string
    updatedAt: string
    UserSkill: UserSkill
  }
  
  export interface UserSkill {
    createdAt: string
    updatedAt: string
    UserId: string
    SkillId: string
  }
  
  export interface Config {
    id: string
    show_birthday: boolean
    show_phone: boolean
    createdAt: string
    updatedAt: string
    ownerId: string
  }
  