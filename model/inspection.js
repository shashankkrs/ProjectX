const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicle",
  },
  engine: {
    compression: String,
    cooling_system: String,
    fuel_system: String,
    ignition_system: String,
    lubrication_system: String,
    controls: String,
    clutch_system: String,
    exhaust_system_induction_system: String,
  },
  transmission_etc: {
    main_gear_box_controls: String,
    auxillary_gear_box_controls: String,
    shaft_u_joint: String,
    rear_axle: String,
    front_axle: String,
    tracta_type_joint_bevel_boxes: String,
    spindles_bearings: String,
    wheels_tyres: String,
    tracks: String,
    brake_service_parking: String,
    reduction_gear: String,
    spring_suspension: String,
    bogies_idler: String,
    steering_gears_controls: String,
    speedometer_recounter_drive: String,
  },
  electrical: {
    accumulator: String,
    dynamo: String,
    voltage_controller: String,
    starter_switch_solenoid: String,
    wiring: String,
    switch_board_lamps_horn_siren: String,
    aux_generator_controls: String,
    power_travers_motor: String,
  },
  lubrication_and_cleanliness: {
    engine: String,
    gear_box: String,
    axles: String,
    general: String,
  },
  chassis_hull_body: {
    chassis: String,
    twin_shackles_hooks: String,
    frame_rear_forks: String,
    body_forks: String,
    canopy_superstructure: String,
    hull: String,
    tool_boxes: String,
    petrol_oil_water_cans: String,
    extinguishers: String,
  },
  tools_accessories: String,
  marks_and_actions: String,
  road_test: String,
  special_fittings: String,
  vehicle_records_updated: String,
});

const Vehicle = mongoose.model("vehicle_inspection", vehicleSchema);

module.exports = Vehicle;
