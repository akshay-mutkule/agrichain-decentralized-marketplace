import { workflowSteps } from '../content';

function WorkflowPage() {
  return (
    <section className="page">
      <div className="section-heading narrow">
        <p className="section-tag">Workflow</p>
        <h1>One process model from onboarding to delivery support.</h1>
        <p>
          The workflow page separates operational sequencing from the homepage so users can review
          how the platform is intended to run without distractions.
        </p>
      </div>

      <div className="timeline">
        {workflowSteps.map((step, index) => (
          <article className="timeline-step" key={step.title}>
            <span className="timeline-index">0{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WorkflowPage;
