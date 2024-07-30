const genericRepo = require("../repository")

const seed = async () => {
    await genericRepo.setOptions('Role', {
        array: [
            {
                id: 'f32dcf16-ba6b-43ec-a5b5-f056836f39d7',
                name: 'TENANT_ADMIN'
            },
            {
                id: 'e32dcf16-ba6b-43ec-a5b5-f056836f39d7',
                name: 'SUPER_ADMIN'
            },
            {
                id: 'b32dcf16-ba6b-43ec-a5b5-f056836f39d7',
                name: 'TEACHER'
            },
            {
                id: 'a32dcf16-ba6b-43ec-a5b5-f056836f39d7',
                name: 'STUDENT'
            },
            {
                id: 'a44dcf16-ba6b-43ec-a5b5-f056836f39d7',
                name: 'PARENT'
            }
        ]
    }).bulkCreate()
}

module.exports = seed