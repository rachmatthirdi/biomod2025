export default function IdeasPage() {
  return (
    <div className="min-h-screen">
      {/* Section 1 */}
      <section id="section-1" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Research Ideas - Conceptualization</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Brainstorming Framework</h2>
              <p className="text-muted-foreground mb-6">
                Our systematic approach to generating and evaluating research ideas combines 
                creative thinking with rigorous scientific methodology. This section outlines 
                the foundational concepts that drive innovation in our research.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Problem identification and scope definition</li>
                <li>• Literature gap analysis</li>
                <li>• Interdisciplinary collaboration opportunities</li>
                <li>• Feasibility assessment criteria</li>
              </ul>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Current Focus Areas</h3>
              <div className="space-y-3">
                <div className="p-3 bg-primary/10 rounded">
                  <h4 className="font-medium">Sustainable Technologies</h4>
                  <p className="text-sm text-muted-foreground">Environmental impact reduction</p>
                </div>
                <div className="p-3 bg-primary/10 rounded">
                  <h4 className="font-medium">AI Ethics</h4>
                  <p className="text-sm text-muted-foreground">Responsible AI development</p>
                </div>
                <div className="p-3 bg-primary/10 rounded">
                  <h4 className="font-medium">Healthcare Innovation</h4>
                  <p className="text-sm text-muted-foreground">Patient-centered solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section id="section-2" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Idea Development Process</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Phase 1: Discovery</h3>
              <p className="text-muted-foreground mb-4">
                Initial exploration and problem identification through comprehensive research 
                and stakeholder engagement.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Market research</li>
                <li>• Stakeholder interviews</li>
                <li>• Competitive analysis</li>
                <li>• Trend identification</li>
              </ul>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">🔬</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Phase 2: Validation</h3>
              <p className="text-muted-foreground mb-4">
                Rigorous testing and validation of concepts through prototyping and 
                preliminary research studies.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Proof of concept</li>
                <li>• Pilot studies</li>
                <li>• Peer review</li>
                <li>• Risk assessment</li>
              </ul>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Phase 3: Implementation</h3>
              <p className="text-muted-foreground mb-4">
                Full-scale development and deployment with continuous monitoring 
                and iterative improvement.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Project planning</li>
                <li>• Resource allocation</li>
                <li>• Timeline management</li>
                <li>• Quality assurance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="section-3" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Innovation Metrics & Success Criteria</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Key Performance Indicators</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-card rounded-lg">
                  <span className="font-medium">Research Impact Factor</span>
                  <span className="text-2xl font-bold text-primary">8.5</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-card rounded-lg">
                  <span className="font-medium">Ideas to Implementation Rate</span>
                  <span className="text-2xl font-bold text-primary">73%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-card rounded-lg">
                  <span className="font-medium">Collaboration Index</span>
                  <span className="text-2xl font-bold text-primary">9.2</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-card rounded-lg">
                  <span className="font-medium">Innovation Score</span>
                  <span className="text-2xl font-bold text-primary">95</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Success Stories</h3>
              <div className="space-y-4">
                <div className="p-4 bg-card rounded-lg border-l-4 border-primary">
                  <h4 className="font-semibold mb-2">Sustainable Energy Solution</h4>
                  <p className="text-muted-foreground text-sm">
                    Developed a novel approach to renewable energy storage that increased 
                    efficiency by 40% while reducing costs by 25%.
                  </p>
                </div>
                <div className="p-4 bg-card rounded-lg border-l-4 border-primary">
                  <h4 className="font-semibold mb-2">AI-Powered Healthcare Tool</h4>
                  <p className="text-muted-foreground text-sm">
                    Created an AI diagnostic tool that improved early detection rates 
                    by 60% in clinical trials.
                  </p>
                </div>
                <div className="p-4 bg-card rounded-lg border-l-4 border-primary">
                  <h4 className="font-semibold mb-2">Educational Technology Platform</h4>
                  <p className="text-muted-foreground text-sm">
                    Launched a platform that enhanced learning outcomes for over 
                    10,000 students across 50 institutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
