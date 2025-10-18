  import { calculateProfileCompletion } from "../utils/calculateProfileCompletion.js";
  import mongoose from "mongoose";
  const { Schema } = mongoose;

  // Profile (portfolio) subdocument schema
  const profileSchema = new Schema({
    ageGroup: {
      type: String,
      enum: ['18-25', '26-35', '36-45', '46-60', '60+'],
      required: false
    },
    experienceLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: false
    },
    annualIncome: {
      type: String,
      enum: ['< ₹2L', '₹2L - ₹5L', '₹5L - ₹10L', '> ₹10L'],
      required: false
    },
    monthlyExpenses: {
      type: Number,
      required: false
    },
    riskTolerance: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      required: false
    },
    financialGoals: [{
      type: String,
      enum: [
        'Emergency Fund',
        'Home Buying',
        'Debt Payoff',
        'Retirement Planning',
        'Education',
        'Wealth Building'
      ]
    }]
  }, { _id: false }); // no _id for subdoc

  // Main User schema
  const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        maxlength: 20,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      googleId: {
        type: String,
        unique: true,
        sparse: true,
      },
      provider: {
  type: String,
  enum: ['local', 'google'],
  default: 'local',
},

      photo: {
        type: String,
      },
      role: {
        type: String,
        default: "user",
      },
      preferences: {
        type: [String],
        default: [],
      },
      seenArticles: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Article",
        default: [],
      },
      quizzesTaken: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Quiz",
          default: [],
        }
      ],
      totalCoins: {
        type: Number,
        default: 50,
        min: 0
      },
      profile: {
        type: profileSchema,
        default: null
      },
      profileCompletion: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      },
      isVerified: { type: Boolean, default: false },
    },
    { timestamps: true }
  );

  export const getAllUsers = async () => {
    return await User.find({});
  };

  // middleware
  // Middleware for save
  userSchema.pre('save', function (next) {
    this.profileCompletion = calculateProfileCompletion(this.profile);
    next();
  });

  // Middleware for update
  // import { calculateProfileCompletion } from "../utils/calculateProfileCompletion.js";

  // ⬇️ This goes after your schema but before model export
  userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    const userId = this.getQuery()._id;

    // Get the profile update
    const profileUpdates = update.profile || (update.$set && update.$set.profile);

    if (!profileUpdates) return next();

    // Fetch the existing user from DB
    const existingUser = await this.model.findById(userId).lean();
    if (!existingUser) return next();

    // Merge old profile with incoming updates
    const fullProfile = {
      ...existingUser.profile,
      ...profileUpdates,
    };

    // Calculate completion
    const completion = calculateProfileCompletion(fullProfile);

    // Inject into update
    if (update.profile) {
      update.profileCompletion = completion;
    } else {
      update.$set = update.$set || {};
      update.$set.profileCompletion = completion;
    }

    next();
  });




  export default mongoose.model("User", userSchema);
