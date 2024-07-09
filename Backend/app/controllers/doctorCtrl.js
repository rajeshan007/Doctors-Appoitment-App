const Doctor = require('../models/doctorModel')
const User = require('../models/userModel')

const doctorCtrl = {}

// apply doctor
doctorCtrl.register = async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body)
        await newDoctor.save()

        // find the admin user 
        const adminUser = await User.findOne({ isAdmin: true })
        // console.log(adminUser);

        // push the notifications to the admin user
        const unseenNotifications = adminUser.unseenNotifications
        unseenNotifications.push({
            type: "new Doctor request",
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for doctor account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + ' ' + newDoctor.lastName
            },
            onClickPath: '/admin/doctors'
        })
        // if thr user is admin  & is true then update the unseenNotifications
        await User.findOneAndUpdate(adminUser._id, { unseenNotifications })
        res.status(200).send({
            message: "Doctor account applied sucessfuly",
            sucess: true,

        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error applying doctor account  ${error.message}`, sucess: false })
    }

}


doctorCtrl.markAllNotificationsAsSeen = async (req, res) => {
    try {
        // first find the user 
        const user = await User.findOne({ _id: req.userId });
        const unseenNotifications = user.unseenNotifications;
        const seenNotifications = user.seenNotifications;
        //push all the unseen Notifications to seenNotifications
        seenNotifications.push(...unseenNotifications);
        // make unseenNotifications as empty
        user.unseenNotifications = [];
        user.seenNotifications = seenNotifications;
        const updatedUser = await user.save();
        // dont send psssword to frontend
        updatedUser.password = undefined;
        res.status(200).send({
            success: true, 
            message: "All notifications marked as seen",
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error applying doctor account  ${error.message}`, sucess: false, error })
    }
}


doctorCtrl.deleteAllNotifications = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId })
        // clear all the notifications
        user.seenNotifications = []
        user.unseenNotifications = []
        const updatedUser = await user.save()
        // dont send psssword to frontend
        updatedUser.password = undefined
        res.status(200).send({
            success: true,
            message: "All notifications cleared",
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error applying doctor account  ${error.message}`, sucess: false, error })
    }


}



module.exports = doctorCtrl