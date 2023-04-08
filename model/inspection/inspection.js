const mongoose = require('mongoose');

const inspectionSchema = mongoose.Schema({
    date:Date,
    vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'vehicles'
    },
    maintaining_unit:String,
    total_kms:Number,
    engine:{
        compression: Boolean,
        cooling_system: Boolean,
        fuel_system: Boolean,
        ignition_system: Boolean,
        lubrication_system: Boolean,
        controls: Boolean,
        clutch_system: Boolean,
        exhaust_induction_system: Boolean,
        remarks: String
    },
    transmission:{
        main_gear_box_controls:Boolean,
        aux_gear_box_controls:Boolean,
        shaft_joint:Boolean,
        rear_axle:Boolean,
        front_axle:Boolean,
        tracta:Boolean,
        spindles_bearings:Boolean,
        wheels_tyres:Boolean,
        tracks:Boolean,
        brake_parking:Boolean,
        reduction_gear:Boolean,
        spring_suspension:Boolean,
        bogles_and_idler:Boolean,
        steering_and_controls:Boolean,
        speedometer:Boolean,
        remarks:String
    },
    electrical:{
        accumulators:Boolean,
        dynamo:Boolean,
        voltage_controllers:Boolean,
        starter_and_switch_solenoid:Boolean,
        wiring:Boolean,
        switch_board_lumps_horn:Boolean,
        aux_generator_and_controls:Boolean,
        power_travers_motor:Boolean,
        remarks:String
    },
    lubrication:{
        engine:Boolean,
        gear_box:Boolean,
        axles:Boolean,
        general:Boolean,
        remarks:String
    },
    chassis:{
        chassis:Boolean,
        twin_shackles_hooks:Boolean,
        frame_and_rear_forks:Boolean,
        body_forks:Boolean,
        canopy_superstructure:Boolean,
        hull:Boolean,
        tool_boxes:Boolean,
        petrol_water_carrier:Boolean,
        extinguishers:Boolean,
        remarks:String
    },
    tools_remark:String,
    road_test:String,
    special_fittings:String,
    vehicle_records:Boolean,
    inspection_remarks:String
});

const inspectionModel = mongoose.model('inspection',inspectionSchema);

module.exports = inspectionModel;