const { default: axios } = require("axios");
const {createViewPath} =require("../helpers/create_view_path")


const getUsers = async (req,res)=>{
    try {
        const users = (
            await axios.get("https://jsonplaceholder.typicode.com/posts")
        ).data;
        res.render(createViewPath("users"),{userId:"Asosiy sahifa",users,page_name:"users"})
    }catch (error){
        console.log(error);
    }
};
const getUserID = async (req,res)=>{
    try {
        const user = await(
            await axios.get(`https://jsonplaceholder.typicode.com/posts/${req.params.userId}`)
        ).data;
        res.render(createViewPath("user"),{userId:user.userId,user,page_name:"users"})
    }catch (error){
        console.log(error);
    }
};

const getAddUser = (req,res)=>{
    res.render(createViewPath("adduser"),{
        title:"New user",
        page_name:"users"
    });
};

const postAddUser = async(req,res)=>{
    const {userId,id,title,body} = req.body;
    try {
        const user = await (
            await axios.post("https://jsonplaceholder.typicode.com/posts",{
                userId,
                id,
                title,
                body,
            })
        ).data;
        res.render(createViewPath("user"),{
            title:"Foydalanuvchilar",
            user,
            page_name:"users",
        });
    }catch (error){
        console.log(error);
    }
};

const deleteUserID = async(req,res)=>{
    const { id } = req.params;
    try {
        const usersData = await axios.delete(
            `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const user = usersData.data;
        console.log(user);
        res.sendStatus(204);
    }catch(error){
        console.log(error);
    }
};

const putEditID = async(req,res)=>{
    const {userId,id1,title,body} = req.body;
    const {id} = req.params;
    try{
        const usersData = await axios.put(
            `https://jsonplaceholder.typicode.com/posts/${id}`,
            {
                userId,
                id1,
                title,
                body,
            }
        );
        const user = usersData.data;
        res.render(createViewPath("user"),{
            title:"Foydalanuvchilar",
            user,
            page_name:"users",
        });
    }catch (error){
        console.error(error);
    }
};

const getEdit = async(req,res)=>{
    try{
        const usersData = await axios({
            method:"GET",
            url: `https://jsonplaceholder.typicode.com/posts/${req.params.id}`,
        });
        const user = usersData.data;
        res.render(createViewPath("edituser"),{
            title:user.username,
            user,
            page_name:"users",
        });
    }catch (error){
        console.error(error);
    }
};

module.exports = {
    getUsers,
    getUserID,
    getAddUser,
    postAddUser,
    deleteUserID,
    putEditID,
    getEdit
    
};
