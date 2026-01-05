import "../css/AboutUsPage.css";

export default function AboutUsPage() {
  return (
    <div className="about-page">
      <div className="about-card">
        <h1>About EasyBuy</h1>

        <p className="about-description">
          EasyBuy is a final course project created as part of the learning
          process.
        </p>

        <p className="about-description">
          The main purpose of EasyBuy is to demonstrate a full-stack
          application. The project reflects both practical knowledge gained
          throughout the course and personal exploration.
        </p>

        <h2>Project Team</h2>

        <div className="about-team">
          <div className="team-member">
            <h3>Alexey Rodygin</h3>
            <p>Frontend</p>
            <span>Responsible for React, client-side logic.</span>

            <a
              href="https://github.com/PRlZRAK"
              target="_blank"
              rel="noreferrer"
              className="github-link"
            >
              GitHub
            </a>
          </div>

          <div className="team-member">
            <h3>Platon Alforov</h3>
            <p>Backend</p>
            <span>Responsible for API, server-side logic.</span>

            <a
              href="https://github.com/Alphorov"
              target="_blank"
              rel="noreferrer"
              className="github-link"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
