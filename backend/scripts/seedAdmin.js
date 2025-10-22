// Direct MongoDB insertion for first SuperAdmin
// Run this: mongosh "your-mongodb-atlas-connection-string"

import("bcryptjs").then(async (bcryptjs) => {
  const hashedPassword = await bcryptjs.default.hash("admin123", 10);

  console.log("\n📋 Copy and paste this into MongoDB Compass or Atlas:");
  console.log('\nDatabase: Select your database (e.g., "tvms")');
  console.log("Collection: adminmodels\n");
  console.log(
    JSON.stringify(
      {
        name: "Super Admin",
        ID: "ADMIN001",
        email: "admin@test.com",
        password: hashedPassword,
        role: "SuperAdmin",
        status: "Unblocked",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      null,
      2
    )
  );

  console.log("\n✅ After inserting, you can login with:");
  console.log("   Email: admin@test.com");
  console.log("   Password: admin123\n");
});







