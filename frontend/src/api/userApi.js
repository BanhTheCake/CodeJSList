import axiosClient from "./axiosClientCreate"

const userApis = {
    async getAllPost(filter) {
        try {
            const data = await axiosClient.get('http://localhost:3000/user/post', {params: filter})
            return data
        } catch (error) {
             console.log(error);
        }
    },
    async createNewPost(value) {
      try {
        const data = await axiosClient.post('http://localhost:3000/user/create', value)
        return data
      } catch (error) {
         console.log(error);
      }  
    },
    async updatePost(value) {
      try {
        const data = await axiosClient.patch('http://localhost:3000/user/update', value)
        return data
      } catch (error) {
         console.log(error);
      }
    },
    async deletePost(value) {
      try {
        const data = await axiosClient.delete('http://localhost:3000/user/delete', { data: value })
        return data
      } catch (error) {
        console.log(error);
      }
    }
}

export default userApis