require("dotenv").config();
const mongoose = require("mongoose");

const Visitor = require("./models/visitor");
const Worker = require("./models/worker");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Visitor.deleteMany({});
    await Worker.deleteMany({});

    console.log("Old visitors and workers deleted");

    const visitors = [
      {
        name: "Rahul Sharma",
        address: "Jaipur, Rajasthan",
        mobile: "9876600001",
        purpose: "Vendor Meeting",
        idProofType: "Aadhaar",
        idProofNumber: "100000000001",
      },
      {
        name: "Priya Verma",
        address: "Delhi",
        mobile: "9876600002",
        purpose: "Interview",
        idProofType: "PAN",
        idProofNumber: "ABCDE0001F",
      },
      {
        name: "Rohan Mehta",
        address: "Mumbai",
        mobile: "9876600003",
        purpose: "Client Meeting",
        idProofType: "Aadhaar",
        idProofNumber: "100000000003",
      },
      {
        name: "Sneha Patel",
        address: "Ahmedabad",
        mobile: "9876600004",
        purpose: "Audit",
        idProofType: "PAN",
        idProofNumber: "ABCDE0002F",
      },
      {
        name: "Arjun Singh",
        address: "Lucknow",
        mobile: "9876600005",
        purpose: "Maintenance Visit",
        idProofType: "Driving License",
        idProofNumber: "DL000001",
      },
      {
        name: "Kavya Nair",
        address: "Kochi",
        mobile: "9876600006",
        purpose: "Training Session",
        idProofType: "Aadhaar",
        idProofNumber: "100000000006",
      },
      {
        name: "Varun Kapoor",
        address: "Chandigarh",
        mobile: "9876600007",
        purpose: "Equipment Inspection",
        idProofType: "PAN",
        idProofNumber: "ABCDE0003F",
      },
      {
        name: "Nikita Rao",
        address: "Hyderabad",
        mobile: "9876600008",
        purpose: "Vendor Meeting",
        idProofType: "Passport",
        idProofNumber: "P1234567",
      },
      {
        name: "Akash Jain",
        address: "Indore",
        mobile: "9876600009",
        purpose: "Project Discussion",
        idProofType: "Aadhaar",
        idProofNumber: "100000000009",
      },
      {
        name: "Meera Iyer",
        address: "Chennai",
        mobile: "9876600010",
        purpose: "Client Meeting",
        idProofType: "Voter ID",
        idProofNumber: "VOT123456",
      },
      {
        name: "Ritesh Kumar",
        address: "Patna",
        mobile: "9876600011",
        purpose: "Audit",
        idProofType: "Aadhaar",
        idProofNumber: "100000000011",
      },
      {
        name: "Pooja Verma",
        address: "Noida",
        mobile: "9876600012",
        purpose: "Interview",
        idProofType: "PAN",
        idProofNumber: "ABCDE0004F",
      },
      {
        name: "Abhishek Das",
        address: "Kolkata",
        mobile: "9876600013",
        purpose: "Training Session",
        idProofType: "Aadhaar",
        idProofNumber: "100000000013",
      },
      {
        name: "Shreya Shah",
        address: "Surat",
        mobile: "9876600014",
        purpose: "Vendor Meeting",
        idProofType: "Passport",
        idProofNumber: "P7654321",
      },
      {
        name: "Aditya Joshi",
        address: "Pune",
        mobile: "9876600015",
        purpose: "Project Discussion",
        idProofType: "Driving License",
        idProofNumber: "DL000015",
      },
    ];

    const workers = [
      {
        name: "Rajesh Kumar",
        address: "Jaipur",
        mobile: "9876500001",
        department: "Production",
        designation: "Machine Operator",
        idProofType: "Aadhaar",
        idProofNumber: "200000000001",
        startDate: new Date("2026-01-01"),
        expiryDate: new Date("2026-12-31"),
      },
      {
        name: "Suresh Yadav",
        address: "Jaipur",
        mobile: "9876500002",
        department: "Production",
        designation: "Supervisor",
        idProofType: "Aadhaar",
        idProofNumber: "200000000002",
        startDate: new Date("2026-01-01"),
        expiryDate: new Date("2026-12-31"),
      },
      {
        name: "Amit Sharma",
        address: "Delhi",
        mobile: "9876500003",
        department: "IT",
        designation: "System Administrator",
        idProofType: "Aadhaar",
        idProofNumber: "200000000003",
        startDate: new Date("2026-01-01"),
        expiryDate: new Date("2026-12-31"),
      },
      {
        name: "Deepak Verma",
        address: "Delhi",
        mobile: "9876500004",
        department: "IT",
        designation: "Network Engineer",
        idProofType: "Aadhaar",
        idProofNumber: "200000000004",
        startDate: new Date("2026-01-01"),
        expiryDate: new Date("2026-12-31"),
      },
      {
        name: "Mohit Singh",
        address: "Jaipur",
        mobile: "9876500005",
        department: "Security",
        designation: "Security Officer",
        idProofType: "Aadhaar",
        idProofNumber: "200000000005",
        startDate: new Date("2026-01-01"),
        expiryDate: new Date("2026-12-31"),
      },
      {
        name: "Rakesh Gupta",
        address: "Jaipur",
        mobile: "9876500006",
        department: "Security",
        designation: "Security Supervisor",
        idProofType: "Aadhaar",
        idProofNumber: "200000000006",
        startDate: new Date("2026-01-01"),
        expiryDate: new Date("2026-12-31"),
      },
      {
        name: "Priya Nair",
        address: "Kochi",
        mobile: "9876500007",
        department: "HR",
        designation: "HR Executive",
        idProofType: "Aadhaar",
        idProofNumber: "200000000007",
        startDate: new Date("2026-01-01"),
        expiryDate: new Date("2026-12-31"),
      },
      {
        name: "Anjali Patel",
        address: "Ahmedabad",
        mobile: "9876500008",
        department: "HR",
        designation: "Recruiter",
        idProofType: "Aadhaar",
        idProofNumber: "200000000008",
        startDate: new Date("2026-01-01"),
        expiryDate: new Date("2026-12-31"),
      },
      {
        name: "Vikram Joshi",
        address: "Pune",
        mobile: "9876500009",
        department: "Production",
        designation: "Technician",
        idProofType: "Aadhaar",
        idProofNumber: "200000000009",
        startDate: new Date("2026-01-01"),
        expiryDate: new Date("2026-12-31"),
      },
      {
        name: "Karan Mehta",
        address: "Mumbai",
        mobile: "9876500010",
        department: "Production",
        designation: "Maintenance Engineer",
        idProofType: "Aadhaar",
        idProofNumber: "200000000010",
        startDate: new Date("2026-01-01"),
        expiryDate: new Date("2026-12-31"),
      },
    ];

    await Visitor.insertMany(visitors);
    await Worker.insertMany(workers);

    console.log(`Visitors Created: ${visitors.length}`);
    console.log(`Workers Created: ${workers.length}`);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();