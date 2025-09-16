export default function ELSIPage() {
  return (
    <div className="min-h-screen">
      {/* Section 1 */}
      <section id="section-1" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">ELSI - Ethical Framework</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Ethical Foundations</h2>
              <p className="text-muted-foreground mb-6">
                Our Ethical, Legal, and Social Implications (ELSI) framework ensures that 
                all research activities are conducted with the highest standards of integrity, 
                respect for human dignity, and consideration for societal impact.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <span className="text-xs">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Beneficence & Non-maleficence</h3>
                    <p className="text-sm text-muted-foreground">Maximizing benefits while minimizing harm</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <span className="text-xs">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Autonomy & Informed Consent</h3>
                    <p className="text-sm text-muted-foreground">Respecting individual choice and decision-making</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <span className="text-xs">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Justice & Fairness</h3>
                    <p className="text-sm text-muted-foreground">Ensuring equitable distribution of benefits and burdens</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">ELSI Review Process</h3>
              <div className="space-y-3">
                <div className="p-3 bg-primary/5 rounded border-l-4 border-primary">
                  <h4 className="font-medium text-sm">Initial Assessment</h4>
                  <p className="text-xs text-muted-foreground">Preliminary ethical screening</p>
                </div>
                <div className="p-3 bg-primary/5 rounded border-l-4 border-primary">
                  <h4 className="font-medium text-sm">Stakeholder Consultation</h4>
                  <p className="text-xs text-muted-foreground">Community and expert input</p>
                </div>
                <div className="p-3 bg-primary/5 rounded border-l-4 border-primary">
                  <h4 className="font-medium text-sm">Risk-Benefit Analysis</h4>
                  <p className="text-xs text-muted-foreground">Comprehensive evaluation</p>
                </div>
                <div className="p-3 bg-primary/5 rounded border-l-4 border-primary">
                  <h4 className="font-medium text-sm">Ongoing Monitoring</h4>
                  <p className="text-xs text-muted-foreground">Continuous oversight</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section id="section-2" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Legal Compliance & Governance</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Regulatory Framework</h3>
              <div className="space-y-4">
                <div className="p-4 bg-card rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2">International Standards</h4>
                  <p className="text-muted-foreground text-sm mb-3">
                    Compliance with global research ethics guidelines including Helsinki Declaration, 
                    Belmont Report, and UNESCO Universal Declaration on Bioethics.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-xs rounded">ISO 14155</span>
                    <span className="px-2 py-1 bg-primary/10 text-xs rounded">ICH-GCP</span>
                    <span className="px-2 py-1 bg-primary/10 text-xs rounded">GDPR</span>
                  </div>
                </div>
                <div className="p-4 bg-card rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-2">Institutional Review</h4>
                  <p className="text-muted-foreground text-sm mb-3">
                    All research protocols undergo rigorous review by our Institutional Review Board (IRB) 
                    to ensure ethical standards and participant protection.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    IRB Protocol #: 2024-ELSI-001
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Data Protection & Privacy</h3>
              <div className="space-y-4">
                <div className="p-4 bg-card rounded-lg shadow-sm border-l-4 border-green-500">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                    Data Minimization
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Collecting only necessary data for research purposes with clear retention policies.
                  </p>
                </div>
                <div className="p-4 bg-card rounded-lg shadow-sm border-l-4 border-blue-500">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                    Encryption & Security
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    End-to-end encryption and secure storage protocols for all sensitive data.
                  </p>
                </div>
                <div className="p-4 bg-card rounded-lg shadow-sm border-l-4 border-purple-500">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <span className="w-4 h-4 bg-purple-500 rounded-full mr-2"></span>
                    Anonymization
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Advanced anonymization techniques to protect participant identity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="section-3" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Social Impact & Community Engagement</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Partnership</h3>
              <p className="text-muted-foreground mb-4">
                Building meaningful relationships with communities affected by our research 
                through transparent communication and collaborative decision-making.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Stakeholder advisory boards</li>
                <li>• Community consultation sessions</li>
                <li>• Cultural sensitivity training</li>
                <li>• Benefit-sharing agreements</li>
              </ul>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Impact Assessment</h3>
              <p className="text-muted-foreground mb-4">
                Systematic evaluation of research outcomes on society, including 
                unintended consequences and long-term implications.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Social Benefit Score</span>
                  <span className="font-semibold">8.7/10</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Risk Mitigation</span>
                  <span className="font-semibold">95%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Community Satisfaction</span>
                  <span className="font-semibold">92%</span>
                </div>
              </div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Responsibility</h3>
              <p className="text-muted-foreground mb-4">
                Considering the global implications of our research and ensuring 
                equitable access to benefits across different populations and regions.
              </p>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-primary/5 rounded">
                  <span className="font-medium">SDG Alignment:</span> 12 Goals
                </div>
                <div className="p-2 bg-primary/5 rounded">
                  <span className="font-medium">Global Partnerships:</span> 25 Countries
                </div>
                <div className="p-2 bg-primary/5 rounded">
                  <span className="font-medium">Open Access:</span> 100% Publications
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
