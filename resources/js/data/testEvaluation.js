// RUN QI TEST
const qiList = ecop.QIList.prototype.factorQIListFromConfig(ecop.QIType.QI, configJSON.QIList)
qiList.loadFromXML(DSXML)

// GENERATE REPORT
const rr = document.getElementById('report-qis')
qiList.qis.forEach(qi => {
  const sr = qi.factorQIReport(TestEvalG.reportDS)
  rr.innerHTML += sr
})

// RUN EQI TEST
const eqiList = ecop.QIList.prototype.factorQIListFromConfig(ecop.QIType.EQI, configJSON.QIList)
eqiList.loadFromXML(EXML)
const result = eqiList.conformityTest(qiList)

const sr = TestEvalG.reportResult({ result })
document.getElementById('report-result').innerHTML += sr
