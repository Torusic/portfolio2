import axios from "axios";

const API_BASE_URL = import.meta.env.PROD
    ? "https://portfolio2-mebq.onrender.com/api"
    : "http://127.0.0.1:8000/api";

const api=axios.create({
    baseURL:API_BASE_URL,
    headers:{
        'Content-Type':'application/json'
    }
})

export const portfolioAPI={
    //profile
    getProfile:()=>api.get('/profile/'),

    //skills
    getSkills:()=>api.get('/skills/'),
    getSkillsByCategory:()=>api.get('/skills/by_category/'),

    //project
    getProjects:()=>api.get('/projects/'),
    getFeaturedProjects:()=>api.get('/projects/featured/'),

    //experience
    getExperience:()=>api.get('/experience/'),

    //contact
    sendMessage:(data)=>api.post('/contact',data)
  
    
}
export default api;