export default function LabNotebookPage() {
  return (
    <div className="min-h-screen">
      {/* Section 1 */}
      <section id="section-1" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Lab Notebook - Documentation System</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Digital Documentation Standards</h2>
              <p className="text-muted-foreground mb-6">
                Our comprehensive digital lab notebook system ensures accurate, traceable, 
                and reproducible documentation of all research activities. Every entry is 
                timestamped, version-controlled, and backed up for data integrity.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-card rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm">📝</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Real-time Entry</h3>
                    <p className="text-xs text-muted-foreground">Immediate documentation during experiments</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-card rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm">🔒</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Tamper-proof Records</h3>
                    <p className="text-xs text-muted-foreground">Blockchain-secured entry validation</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-card rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm">🔍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Advanced Search</h3>
                    <p className="text-xs text-muted-foreground">AI-powered content discovery</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Recent Entries</h3>
              <div className="space-y-3">
                <div className="p-3 border-l-4 border-primary bg-primary/5 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">Experiment #2024-156</h4>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Protein crystallization trial with modified buffer conditions. 
                    Observed improved crystal formation at pH 7.2.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-xs rounded">Crystallography</span>
                    <span className="px-2 py-1 bg-primary/10 text-xs rounded">pH Optimization</span>
                  </div>
                </div>
                <div className="p-3 border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">Data Analysis #DA-089</h4>
                    <span className="text-xs text-muted-foreground">1 day ago</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Statistical analysis of behavioral data shows significant correlation 
                    (p{'<'}0.001) between treatment groups.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-xs rounded">Statistics</span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-xs rounded">Behavioral</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section id="section-2" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Experimental Protocols & Procedures</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Standard Operating Procedures</h3>
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-2 text-xs">1</span>
                    Sample Preparation
                  </h4>
                  <p className="text-muted-foreground text-sm mb-3">
                    Standardized protocols for sample collection, processing, and storage 
                    to ensure consistency across all experiments.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-muted/50 rounded">
                      <span className="font-medium">Temperature:</span> 4°C
                    </div>
                    <div className="p-2 bg-muted/50 rounded">
                      <span className="font-medium">pH Range:</span> 6.8-7.4
                    </div>
                    <div className="p-2 bg-muted/50 rounded">
                      <span className="font-medium">Storage:</span> -80°C
                    </div>
                    <div className="p-2 bg-muted/50 rounded">
                      <span className="font-medium">Shelf Life:</span> 6 months
                    </div>
                  </div>
                </div>
                <div className="bg-card p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-2 text-xs">2</span>
                    Data Collection
                  </h4>
                  <p className="text-muted-foreground text-sm mb-3">
                    Automated data acquisition systems with real-time quality control 
                    and error detection mechanisms.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Automated instrument calibration</li>
                    <li>• Real-time data validation</li>
                    <li>• Duplicate measurement protocols</li>
                    <li>• Statistical quality control</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Quality Control Metrics</h3>
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-4">Reproducibility Dashboard</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Inter-assay CV</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-16 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-semibold">2.3%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Intra-assay CV</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-18 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-semibold">1.8%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Recovery Rate</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-19 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-semibold">98.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-card p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-4">Equipment Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950/20 rounded">
                      <span className="text-sm">Spectrophotometer</span>
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">Operational</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950/20 rounded">
                      <span className="text-sm">Centrifuge</span>
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">Calibrated</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                      <span className="text-sm">PCR Machine</span>
                      <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded">Maintenance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="section-3" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Data Analysis & Results Tracking</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Statistical Analysis Pipeline</h3>
              <div className="space-y-4">
                <div className="p-4 bg-card rounded-lg shadow-sm border-l-4 border-blue-500">
                  <h4 className="font-semibold mb-2">Data Preprocessing</h4>
                  <p className="text-muted-foreground text-sm mb-3">
                    Automated data cleaning, normalization, and outlier detection using 
                    machine learning algorithms.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-xs rounded">Missing Data Imputation</span>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-xs rounded">Outlier Detection</span>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-xs rounded">Normalization</span>
                  </div>
                </div>
                <div className="p-4 bg-card rounded-lg shadow-sm border-l-4 border-purple-500">
                  <h4 className="font-semibold mb-2">Statistical Testing</h4>
                  <p className="text-muted-foreground text-sm mb-3">
                    Comprehensive statistical analysis including parametric and non-parametric tests, 
                    multiple comparison corrections, and effect size calculations.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded">
                      <span className="font-medium">t-tests:</span> 156
                    </div>
                    <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded">
                      <span className="font-medium">ANOVA:</span> 42
                    </div>
                    <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded">
                      <span className="font-medium">Chi-square:</span> 28
                    </div>
                    <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded">
                      <span className="font-medium">Regression:</span> 73
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Results Visualization</h3>
              <div className="bg-card p-6 rounded-lg shadow-md">
                <h4 className="font-semibold mb-4">Experiment Success Rate</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Successful Experiments</span>
                      <span className="text-sm font-semibold">87%</span>
                    </div>
                    <div className="w-full h-3 bg-muted rounded-full">
                      <div className="w-[87%] h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Reproducible Results</span>
                      <span className="text-sm font-semibold">92%</span>
                    </div>
                    <div className="w-full h-3 bg-muted rounded-full">
                      <div className="w-[92%] h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Data Quality Score</span>
                      <span className="text-sm font-semibold">95%</span>
                    </div>
                    <div className="w-full h-3 bg-muted rounded-full">
                      <div className="w-[95%] h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <h5 className="font-semibold text-sm mb-2">Key Findings Summary</h5>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 23% improvement in assay sensitivity</li>
                    <li>• Reduced processing time by 40%</li>
                    <li>• 99.7% data integrity maintained</li>
                    <li>• Zero critical protocol deviations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
