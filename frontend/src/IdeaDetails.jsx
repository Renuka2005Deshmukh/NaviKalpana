import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./IdeaDetails.css";

function IdeaDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const idea = location.state?.idea;
  const material = location.state?.material;

  if (!idea) {
    return (
      <div className="details-page">
        <h2>Idea details not found!</h2>
        <button onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  const instructions = {
    "Plastic Bottle Planter": [
      "Take an empty plastic bottle and clean it properly.",
      "Cut the bottle carefully into the required shape.",
      "Make small drainage holes at the bottom.",
      "Paint and decorate the bottle.",
      "Add soil and plant a small plant."
    ],

    "Bottle Desk Organizer": [
      "Take an empty plastic bottle.",
      "Cut the upper portion carefully.",
      "Cover sharp edges with tape.",
      "Decorate it using paint or colored paper.",
      "Use it to store pens and stationery."
    ],

    "Hanging Garden": [
      "Collect clean plastic bottles.",
      "Cut an opening on the side of each bottle.",
      "Make drainage holes.",
      "Add soil and small plants.",
      "Attach the bottles securely to a suitable support."
    ],
  "Paper Flowers": [
    "Collect old newspapers or waste paper.",
    "Cut the paper into flower-shaped pieces.",
    "Fold and arrange the paper petals.",
    "Attach the petals using glue.",
    "Decorate the flower with colors."
  ],

  "Paper Wall Art": [
    "Collect old colorful paper.",
    "Cut paper into different shapes.",
    "Create an attractive design.",
    "Arrange the shapes on a cardboard sheet.",
    "Paste everything and allow it to dry."
  ],

  "Paper Gift Bag": [
    "Take an old newspaper or craft paper.",
    "Fold the paper into a rectangular shape.",
    "Join the sides using glue.",
    "Fold the bottom to create a base.",
    "Attach paper handles to complete the bag."
  ],

  "Cardboard Organizer": [
    "Collect clean waste cardboard.",
    "Cut cardboard into required pieces.",
    "Join the pieces using glue.",
    "Create separate storage sections.",
    "Decorate the organizer."
  ],

  "Mini Storage Box": [
    "Take a cardboard sheet.",
    "Measure and cut the required pieces.",
    "Fold the cardboard to create a box.",
    "Join the edges using glue.",
    "Decorate the storage box."
  ],

  "Photo Frame": [
    "Take a cardboard sheet.",
    "Cut two rectangular cardboard pieces.",
    "Create an opening in the front piece.",
    "Join both pieces and leave space for a photo.",
    "Decorate the photo frame."
  ],

  "Decorative Bottle": [
    "Clean and dry an empty glass bottle.",
    "Remove the label carefully.",
    "Paint the bottle with suitable glass paint.",
    "Add decorative designs.",
    "Allow it to dry completely."
  ],

  "Bottle Flower Vase": [
    "Clean an empty glass bottle.",
    "Remove labels and dry the bottle.",
    "Decorate it using paint or ribbons.",
    "Fill it with clean water.",
    "Add fresh flowers."
  ],

  "Bottle Lamp": [
    "Clean and dry an empty glass bottle.",
    "Use a ready-made battery-operated LED string light.",
    "Carefully place the lights inside the bottle.",
    "Arrange the lights for decoration.",
    "Switch on the LED lights."
  ]
  };

  const steps = instructions[idea.title] || [
    "Collect and clean the required waste material.",
    "Prepare the material for your DIY project.",
    "Decorate and assemble your project carefully.",
    "Your creative reuse project is ready!"
  ];

  return (
    <div className="details-page">

      <button
        className="details-back-btn"
        onClick={() => navigate("/ideas", {
          state: { material }
        })}
      >
        ← Back to Ideas
      </button>

      <h1>{idea.title}</h1>

      <p className="details-description">
        {idea.description}
      </p>

      <div className="details-card">

        <h2>Project Information</h2>

        <p><strong>Material:</strong> {material}</p>

        <p><strong>Difficulty:</strong> {idea.difficulty}</p>

        <p><strong>Estimated Cost:</strong> {idea.cost}</p>

        <h2>Required Materials</h2>

        <ul>
          <li>{material}</li>
          <li>Scissors or cutter (use carefully)</li>
          <li>Paint or decorative materials</li>
          <li>Glue or adhesive</li>
        </ul>

        <h2>Step-by-Step Instructions</h2>

        <ol>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        <h2>Final Result</h2>

        <p>
          Create something useful and beautiful
          from waste materials!
        </p>

      </div>

    </div>
  );
}

export default IdeaDetails;