const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const projectDetailSchema = new Schema({
    Title:{
        type: String
    },
    Technologies:{
        type: String
    }

});
const technicalSkillsetSchema = new Schema({
    Frontend:{
        type: String
    },
    Backend:{
        type: String
    },
    Databases:{
        type: String
    },
    Infrastructre:{
        type: String
    }

});
const otherInformationSchema = new Schema({
    Availability:{
        type: String
    }
});

const projectSchema = new Schema({
 project : projectDetailSchema,
 Technical_Skillset: technicalSkillsetSchema,
 Other_Information: otherInformationSchema
});

const projectModel = mongoose.model("projectModel",projectSchema);

module.exports = projectModel;