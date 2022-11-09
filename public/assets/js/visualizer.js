/*

Version: 1.0.0 - 06-10-2022
---Order of the application--
    1. Event: Document.Ready
        1.1. All main buttons actions
        1.2. Normalize "canvas" objects dimensions
        1.3. Set screen to show the first section

    2. Event: Window.Load
        2.1. iniCanvas()
        2.2. getJSONData()                                  [1º function > return: true]
        2.3. Apply "Custom Scrollbars" plugin

    3. Functions called in chain after JSON return {Dynamic data required}
        3.1. drawBubbles()                                  [2º function]
        3.2. createBubblesFilters()                         [3º function]
            3.2.1. applyBubblesFilters() * called anytime
            3.2.2. resetBubblesFilters()            
        3.3. drawMountains()                                [4º function]
        3.4. drawLines()                                    [5º function]
            3.4.1. updateCustomLinesTooltip(elemDatasetIndex, elemINDEX, elemX, elemY, elemID, elemVAL, elemDESCFinal)            
        3.5. createLinesFilters()                           [6º function]
            3.5.1. applyLinesFilters() * called anytime
            3.2.2. resetLinesFilters()  
                3.5.1.1 dataLinesNotFound()       

    4. Extra functions called anytime for all features
        4.1. openMenuCharts()
        4.2. openMenuInfos()
        4.3. closeMenus()        
        4.4. changeSections(myanchor, myvalue)
        4.5. normalizeStr(string)
        4.6. closeAllFilters()
        4.7. nextPoint()
        4.8. prevPoint()
        4.9. updatePoint(index)
        4.10. hideTooltipLines()
        4.11. getColor(percent)

    5. Singles functions called just one time for specific features
        5.1. function preloaderRemove()
        5.2. function preloaderClose()
        5.3. function preloaderExit()

*/

var staticGlobalData = [
  {
    label: "Line Change Potential by Moment",
    data: [
      {
        "Patient Assessment": "1,93856903",
      },
      {
        "Treatment Decision": "15,98943065",
      },
      {
        "Coverage Check from Practice Manager": "16,97739053",
      },
      {
        "Practice Manager Processes Script with SP": "0,142062974",
      },
      {
        "Paperwork Submitted": "2,780656",
      },
      {
        "SP Confirms Coverage of Payer Plan": "16,97739053",
      },
      {
        "SP Confirms Benefits With Payer Plan": "0,07083778476",
      },
      {
        "SP Ships Medicine to Patient": "6,812137176",
      },
      {
        "Patient Receives Treatment": "12,02677974",
      },
    ],
  },
  {
    label: "Bubbles - Theme Score by Moment",
    data: [
      {
        "Journey Moment": "Patient Assessment",
        "Bubble Order": "1",
        "Hate or Love": "Hate",
        Theme: "Access",
        "Importance Score (Scaled)": "1,4375",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "High",
        Stakeholder:
          "provider-gi, provider-rheum, provider-derm, patient, payer, pbm",
      },
      {
        "Journey Moment": "Patient Assessment",
        "Bubble Order": "2",
        "Hate or Love": "Hate",
        Theme: "Experience",
        "Importance Score (Scaled)": "1,125",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium High",
        Stakeholder: "patient, payer, pm",
      },
      {
        "Journey Moment": "Patient Assessment",
        "Bubble Order": "3",
        "Hate or Love": "Hate",
        Theme: "Product",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "Patient Assessment",
        "Bubble Order": "4",
        "Hate or Love": "Love",
        Theme: "Access",
        "Importance Score (Scaled)": "1,25",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium High",
        Stakeholder: "provider-gi, provider-rheum, payer, pm",
      },
      {
        "Journey Moment": "Patient Assessment",
        "Bubble Order": "5",
        "Hate or Love": "Love",
        Theme: "Experience",
        "Importance Score (Scaled)": "1,4375",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "High",
        Stakeholder: "provider-gi, provider-rheum, patient, pm",
      },
      {
        "Journey Moment": "Patient Assessment",
        "Bubble Order": "6",
        "Hate or Love": "Love",
        Theme: "Product",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "Treatment Decision",
        "Bubble Order": "1",
        "Hate or Love": "Hate",
        Theme: "Access",
        "Importance Score (Scaled)": "0,4375",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium",
        Stakeholder: "provider-gi, provider-rheum, provider-derm",
      },
      {
        "Journey Moment": "Treatment Decision",
        "Bubble Order": "2",
        "Hate or Love": "Hate",
        Theme: "Experience",
        "Importance Score (Scaled)": "0,125",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium Low",
        Stakeholder: "provider-gi, provider-rheum",
      },
      {
        "Journey Moment": "Treatment Decision",
        "Bubble Order": "3",
        "Hate or Love": "Hate",
        Theme: "Product",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
        Stakeholder: "provider-gi, provider-rheum, pm",
      },
      {
        "Journey Moment": "Treatment Decision",
        "Bubble Order": "4",
        "Hate or Love": "Love",
        Theme: "Access",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "Treatment Decision",
        "Bubble Order": "5",
        "Hate or Love": "Love",
        Theme: "Experience",
        "Importance Score (Scaled)": "0,5625",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium",
        Stakeholder: "provider-gi, provider-rheum, pm",
      },
      {
        "Journey Moment": "Treatment Decision",
        "Bubble Order": "6",
        "Hate or Love": "Love",
        Theme: "Product",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "Coverage Check from Practice Manager",
        "Bubble Order": "1",
        "Hate or Love": "Hate",
        Theme: "Access",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "Coverage Check from Practice Manager",
        "Bubble Order": "2",
        "Hate or Love": "Hate",
        Theme: "Experience",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "Coverage Check from Practice Manager",
        "Bubble Order": "3",
        "Hate or Love": "Hate",
        Theme: "Product",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "Coverage Check from Practice Manager",
        "Bubble Order": "4",
        "Hate or Love": "Love",
        Theme: "Access",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "Coverage Check from Practice Manager",
        "Bubble Order": "5",
        "Hate or Love": "Love",
        Theme: "Experience",
        "Importance Score (Scaled)": "0,3125",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium",
        Stakeholder: "provider-gi, provider-rheum, pm",
      },
      {
        "Journey Moment": "Coverage Check from Practice Manager",
        "Bubble Order": "6",
        "Hate or Love": "Love",
        Theme: "Product",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "Practice Manager Processes Script with SP",
        "Bubble Order": "1",
        "Hate or Love": "Hate",
        Theme: "Access",
        "Importance Score (Scaled)": "0,1875",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium Low",
        Stakeholder: "provider-gi, provider-rheum",
      },
      {
        "Journey Moment": "Practice Manager Processes Script with SP",
        "Bubble Order": "2",
        "Hate or Love": "Hate",
        Theme: "Experience",
        "Importance Score (Scaled)": "0,1875",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium Low",
        Stakeholder: "provider-gi, provider-rheum",
      },
      {
        "Journey Moment": "Practice Manager Processes Script with SP",
        "Bubble Order": "3",
        "Hate or Love": "Hate",
        Theme: "Product",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "Practice Manager Processes Script with SP",
        "Bubble Order": "4",
        "Hate or Love": "Love",
        Theme: "Access",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "Practice Manager Processes Script with SP",
        "Bubble Order": "5",
        "Hate or Love": "Love",
        Theme: "Experience",
        "Importance Score (Scaled)": "1,4375",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "High",
        Stakeholder: "provider-gi, provider-rheum, patient",
      },
      {
        "Journey Moment": "Practice Manager Processes Script with SP",
        "Bubble Order": "6",
        "Hate or Love": "Love",
        Theme: "Product",
        "Importance Score (Scaled)": "0,875",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium High",
        Stakeholder: "provider-gi, provider-rheum",
      },
      {
        "Journey Moment": "Paperwork Submitted",
        "Bubble Order": "1",
        "Hate or Love": "Hate",
        Theme: "Access",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "Paperwork Submitted",
        "Bubble Order": "2",
        "Hate or Love": "Hate",
        Theme: "Experience",
        "Importance Score (Scaled)": "1,4375",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "High",
        Stakeholder: "provider-gi, provider-rheum, patient",
      },
      {
        "Journey Moment": "Paperwork Submitted",
        "Bubble Order": "3",
        "Hate or Love": "Hate",
        Theme: "Product",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "Paperwork Submitted",
        "Bubble Order": "4",
        "Hate or Love": "Love",
        Theme: "Access",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "Paperwork Submitted",
        "Bubble Order": "5",
        "Hate or Love": "Love",
        Theme: "Experience",
        "Importance Score (Scaled)": "2,25",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "High",
        Stakeholder: "provider-gi, provider-rheum,provider-derm, patient, pm",
      },
      {
        "Journey Moment": "Paperwork Submitted",
        "Bubble Order": "6",
        "Hate or Love": "Love",
        Theme: "Product",
        "Importance Score (Scaled)": "0,875",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium High",
        Stakeholder: "provider-gi, provider-rheum",
      },
      {
        "Journey Moment": "SP Confirms Coverage of Payer Plan",
        "Bubble Order": "1",
        "Hate or Love": "Hate",
        Theme: "Access",
        "Importance Score (Scaled)": "1,1875",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium High",
        Stakeholder: "patient, pbm",
      },
      {
        "Journey Moment": "SP Confirms Coverage of Payer Plan",
        "Bubble Order": "2",
        "Hate or Love": "Hate",
        Theme: "Experience",
        "Importance Score (Scaled)": "0,25",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium Low",
        Stakeholder: "patient, pbm",
      },
      {
        "Journey Moment": "SP Confirms Coverage of Payer Plan",
        "Bubble Order": "3",
        "Hate or Love": "Hate",
        Theme: "Product",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "SP Confirms Coverage of Payer Plan",
        "Bubble Order": "4",
        "Hate or Love": "Love",
        Theme: "Access",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "SP Confirms Coverage of Payer Plan",
        "Bubble Order": "5",
        "Hate or Love": "Love",
        Theme: "Experience",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "SP Confirms Coverage of Payer Plan",
        "Bubble Order": "6",
        "Hate or Love": "Love",
        Theme: "Product",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "SP Confirms Benefits With Payer Plan",
        "Bubble Order": "1",
        "Hate or Love": "Hate",
        Theme: "Access",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "SP Confirms Benefits With Payer Plan",
        "Bubble Order": "2",
        "Hate or Love": "Hate",
        Theme: "Experience",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "SP Confirms Benefits With Payer Plan",
        "Bubble Order": "3",
        "Hate or Love": "Hate",
        Theme: "Product",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "SP Confirms Benefits With Payer Plan",
        "Bubble Order": "4",
        "Hate or Love": "Love",
        Theme: "Access",
        "Importance Score (Scaled)": "2,3125",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "High",
        Stakeholder: "payer, pbm, pm",
      },
      {
        "Journey Moment": "SP Confirms Benefits With Payer Plan",
        "Bubble Order": "5",
        "Hate or Love": "Love",
        Theme: "Experience",
        "Importance Score (Scaled)": "0,5",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium",
        Stakeholder: "payer, pbm, pm",
      },
      {
        "Journey Moment": "SP Confirms Benefits With Payer Plan",
        "Bubble Order": "6",
        "Hate or Love": "Love",
        Theme: "Product",
        "Importance Score (Scaled)": "0,5625",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium",
        Stakeholder: "pbm",
      },
      {
        "Journey Moment": "SP Ships Medicine to Patient",
        "Bubble Order": "1",
        "Hate or Love": "Hate",
        Theme: "Access",
        "Importance Score (Scaled)": "0,1875",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium Low",
        Stakeholder: "provider-gi",
      },
      {
        "Journey Moment": "SP Ships Medicine to Patient",
        "Bubble Order": "2",
        "Hate or Love": "Hate",
        Theme: "Experience",
        "Importance Score (Scaled)": "0,1875",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium Low",
        Stakeholder: "provider-gi",
      },
      {
        "Journey Moment": "SP Ships Medicine to Patient",
        "Bubble Order": "3",
        "Hate or Love": "Hate",
        Theme: "Product",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "SP Ships Medicine to Patient",
        "Bubble Order": "4",
        "Hate or Love": "Love",
        Theme: "Access",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "SP Ships Medicine to Patient",
        "Bubble Order": "5",
        "Hate or Love": "Love",
        Theme: "Experience",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "SP Ships Medicine to Patient",
        "Bubble Order": "6",
        "Hate or Love": "Love",
        Theme: "Product",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "Patient Receives Treatment",
        "Bubble Order": "1",
        "Hate or Love": "Hate",
        Theme: "Access",
        "Importance Score (Scaled)": "0,1875",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium Low",
        Stakeholder: "provider-gi, provider-rheum, pbm",
      },
      {
        "Journey Moment": "Patient Receives Treatment",
        "Bubble Order": "2",
        "Hate or Love": "Hate",
        Theme: "Experience",
        "Importance Score (Scaled)": "0,5",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium",
        Stakeholder: "provider-gi, provider-rheum, pm",
      },
      {
        "Journey Moment": "Patient Receives Treatment",
        "Bubble Order": "3",
        "Hate or Love": "Hate",
        Theme: "Product",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
      {
        "Journey Moment": "Patient Receives Treatment",
        "Bubble Order": "4",
        "Hate or Love": "Love",
        Theme: "Access",
        "Importance Score (Scaled)": "0,25",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium Low",
        Stakeholder: "provider-gi, provider-rheum,provider-derm, payer",
      },
      {
        "Journey Moment": "Patient Receives Treatment",
        "Bubble Order": "5",
        "Hate or Love": "Love",
        Theme: "Experience",
        "Importance Score (Scaled)": "0,4375",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Medium",
        Stakeholder: "provider-gi, patient, payer",
      },
      {
        "Journey Moment": "Patient Receives Treatment",
        "Bubble Order": "6",
        "Hate or Love": "Love",
        Theme: "Product",
        "Importance Score (Scaled)": "0",
        "Donwload IR": "https://hateaudit.io/beta/downloads/file-example.pdf",
        "Importance Score (Label)": "Low",
      },
    ],
  },

  //Gradient lines (love and hate)
  {
    label: "Main Table",
    data: [
      {
        "Point Type": "Love",
        Stakeholder: "patient",
        "Point Name":
          "Patients love to know which ACA (any insurance) plan is more likely to cover their HUMIRA.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Hello everyone, my doctor wants to see if Humira will help me and I'm ready to try almost anything at this point. My question is has anyone had trouble with insurance? I'm going to select from the ACA soon and am hopefully get a plan that will help with it. Thanks! #sarcoidosis",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0,5",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,6",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,08378390203",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,2623333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,2",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,4",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "patient",
        "Point Name":
          "Patients love when they can adjust their HUMIRA concentration / dosage with ease.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "The thought of not having to fight my insurance company makes me want to weep with joy. I'm currently battling them to increase my dose of Humira because I'm under-medicated. I won't give up! That's exactly what they want. #M4A",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,5",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,33334",
        "Love / Hate Score (Lay)": "Medium Low",
        "Possibility of Change (RMSE)": "0,08378390203",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,2623333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,16667",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,16667",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "patient",
        "Point Name":
          "Patients love when they receive support for how to plan living a normal life (pregnancy, etc.) while on HUMIRA.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "So I used my private medical insurance after you good people suggesting pursuing this and things have progressed quickly. Thanks for all your help and support! I've now had an MRI and saw the Rheumatologist this week to go over the results and next steps. I've not been diagnosed with AS but probable spondyloarthritis and the chronic Uveitis is the tipping point for treatment (although my MRI did show current and past inflammation of the sacroiliac joint; he pointed to the bone marrow in particular). I will be treated with Humira or a biosimilar and treatment is on the NHS (I have an appointment early in March). I'm processing this and don't know what I need to know about the treatment, or the questions to ask about prognosis, impact etc. How do I digest this and what do I need to know about treatment and life from now?",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "0,389770723",
        "Sentiment (Lay)": "Medium High",
        "Love / Hate Score": "0,612794613",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,08378390203",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,2623333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,26010101",
        "Trust / Fear Value (Lay)": "Medium",
        "Joy / Anger Value (verbatim count mean)": "0,334175084",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0,018518519",
        "Love  / Digust Value (Lay)": "High",
      },
      {
        "Point Type": "Love",
        Stakeholder: "patient",
        "Point Name":
          "Patients love being able to easily communicate with their specialist team about HUMIRA.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "1 week until my doctor appointment! Its been 3 1/2 months of being on Humira and if you've seen any of my last post, you know it's been a wild ride of going back and forth between sick and healthy, emotional breakdowns, and a million what ifs. All I want is for Humira to work. I really hoped everything would be working and figured out before I started class again in the fall. Im not in a flare up anymore so hopefully that is the good news I have been looking for. Maybe it's working? Just so excited to finally be able to go to the doctor and tell him everything so we can work it out. Hope everyone has had a good Monday so far and has something good happen to them today  #uc #ulcerativecolitisandcrohns #ulcerativecolitis #humira",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "0,388167388",
        "Sentiment (Lay)": "Medium High",
        "Love / Hate Score": "0,575290698",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,08378390203",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,2623333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,204069767",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,350290698",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0,020930233",
        "Love  / Digust Value (Lay)": "High",
      },
      {
        "Point Type": "Love",
        Stakeholder: "patient",
        "Point Name":
          "Patients (conditions > 1) love when their providers coordinate with colleagues to streamline patient care.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "I had a telehealth visit for my rheumatology consult last month and already had great first impressions of my doctor. I messaged her a few weeks later and desperately asked for steroids and she said she wasn't comfortable starting anything without a physical exam. She was booked she said, but her PA had openings in a few days. Cool. PA was also great and after my exam, my doctor actually came in and spent 5-10 additional minutes with me. AND. This wonderful woman called my wound care specialist to discuss my case, as everyone's hesitant to start me on meds with wounds from a poorly healed surgery in June. Dunno about everyone else, but here in Pittsburgh at most healthcare facilities I've been to, that just ain't happening. Anyway, I felt hope today for the first time since April (and I also left with steroids which helps, ha). I'm sad about my diagnosis but confident in the team that's treating me, and excited to get started on Humira. Just wanted to share a bit of positivity.",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "0,377777778",
        "Sentiment (Lay)": "Medium High",
        "Love / Hate Score": "0,563372718",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,08378390203",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,2623333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,21160043",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,331364125",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0,020408163",
        "Love  / Digust Value (Lay)": "High",
      },
      {
        "Point Type": "Love",
        Stakeholder: "patient",
        "Point Name":
          "Patients love receiving more information from their peers on the risks and rewards of HUMIRA before agreeing with their providers to take it.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Today was my first Humira day!  Humira is an injectable prescription used to treat Crohns and other inflammatory diseases (you have probably seen their commercial at some point in time). I wanted to make a post about this to just give insight for those who are curious. I did a lot of research and reading/ seeing other people's experiences helped so much. So here's the run down: Humira will work at the source of the inflammation to block it before it happens instead of treating it after the fact. You have to order it from a specialty pharmacy and they overnight it in a box with special packaging. You then store it in the fridge pretty much up until you're ready to take it. . . I highly recommend looking into the resources that Humira has. I was able to sign up for a program where they assign you you're own nurse ambassador. Typically, the nurse would come to your home the first time but for now they are only able to be available over the phone. My nurse was so helpful and talked me through the whole process! Not going to lie, it was more difficult and more painful than I expected but I felt supported the whole way through. Common side effects on the day of the injection include fatigue, nausea, and headache. Which I am feeling but as long as I can just relax I'll be fine. . . It will take about 2-3 months to start working but I am hopeful as I've heard really great things about Humira!  Medications like these help people like me to (hopefully) have a normal life. I am thankful to live in a time where these resources are available  #ibdvisible #humira #crohnsawareness",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,323051948",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,540994624",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,08378390203",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,2623333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,16624424",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,366685868",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0,008064516",
        "Love  / Digust Value (Lay)": "Medium",
      },
      {
        "Point Type": "Love",
        Stakeholder: "patient",
        "Point Name":
          "Patients love when they are advised on ways to protect their immune system while taking HUMIRA.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Hey everyone, I've been ghosting in here for the last 2-3 months. I really am happy to see the success stories and the awesome attitude everyone has...inspiring especially because I am going to attempt cutting out carbs completely and journeying into this new life style change. I never call things diets. It never works out. But I was wondering if the title caught anyone's attention who has crohns. I've read some of the already existing posts as well but I'm wanting some new and updated answers as well. I've heard zero carbs, zero sugar and lots of omega 3 can stop the inflammation process. And when you have Crohn's that's pretty vital to being able to maintain remissions and keep our intestines healthy. Now, my diet is rough, I am told no veggies. I am told low residue diet. I tried Keto and it did not work out. I also have what's called an intussusception which is where the intestine folds over itself and it's kind of like a partial blockage... with that being said a decrease in inflammation would be ideal. I am going to be starting Humira sometime within the next few weeks and I just am wondering... does anyone have advice on healing the gut? Staying on top of my nutrition and supplements. I'm already vitamin D deficient and maybe what to do when I don't feel hungry? I can't find any shake that doesn't hurt me that's zero carbs. The only one so far is the EAS ones. And ensure is like death in a bottle. Wow. Anyways, any tips would be awesome. I'll be sure to talk to my doc before going on but he was supportive of Keto so I don't see why he would not be supportive of this, unfortunately Keto just had way too much fat for my stomach. Keep up the great work everyone and I look forward to some awesome answers and personal stories!",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "0,31579",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,5",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,08378390203",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,2623333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,13333",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,36667",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "patient",
        "Point Name":
          "Patients love when a provider has a plan B in place should HUMIRA fail.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Here to normalize taking medications! Injection based medications seem scary, but they aren't so bad. Any diabetic can probably tell you that. I'm not diabetic but I do have #AnkylosingSpondylitis. This is my third biologic medication to try in less than 2 years. Humira crapped out on me. So I'm on to the next. #Simponi. The process one has to go through getting approved for these meds is RIDICULOUS! It took me months to get everything in order for Humira, only for it to barely be effective. Fortunately my rheumatologist has a few months worth of samples in the office of this one. It feels REALLY good to have a doctor whose got your back. We'll see what happens with this med. If you have this shitty disease, feel free to reach out to me. I find a support system of people who know what it's like to go through this is really helpful. You aren't alone. Content warning: Third swipe is a video of me injecting (no needles visible though). Normalizing this stuff is important to me. Oh and normalizing beautiful, squishy bellies is pretty cool too. I'm pretty fond of mine. (Song is \"It's alright\" by Mother Mother)",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "0,3125",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,7",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,08378390203",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,2623333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,3",
        "Trust / Fear Value (Lay)": "Medium",
        "Joy / Anger Value (verbatim count mean)": "0,4",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "patient",
        "Point Name": "Patients love knowing how to appeal insurance denials.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "hi everyone. i (29F) have recently been recommended by my rheumatologist to begin treating my psoriatic arthritis with Cimzia. however, my insurance (UHC) doesn't think that medication \"necessary\"... and my doctor's second choice would be humira, which i hear from my derm that it's not the best at treating my psoriatic symptoms and has a much lower success rate in general. my first appeal was denied and i'm about to begin a second appeal. i am going to call my insurance to ask what i need to provide for the second appeal before getting started as well, but wanted to reach out to this community and ask: has anyone experienced something similar appealing treatment for PsA? are there any tips/tricks for a better chance at getting approved? is cimzia even worth it? living with PsA is already such an exhausting experience!!! and this insurance thing is really just not fun at all. any insight is very much appreciated, thank you for reading!",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0,30769",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,53334",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,08378390203",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,2623333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,06667",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,46667",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "patient",
        "Point Name":
          "Patients love nursing teams to help manage their HUMIRA care.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Medical Update: It appears my Rheumatologist has had to go on emergency medical leave (I hope everything is okay). In her absence I will be under the care of Humira nurse, Methotrexate nurses and a nurse practitioner at The Canadian Auto Immune Clinic. At this time I ask for good thoughts and support for myself and my nursing team as we continue to deal with a very tricky condition. I'll be celebrating 31 this month (yay to being a 2 4 weekend baby) and I should not require all of these medications to contain my condition. But it is all research knows at this time. Hence my commitment to raise awareness and funds to help folks with auto immune and chronic Illness. May we always look upon the socks to lead us forward. -Jess",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "0,28125",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,561904762",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,08378390203",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,2623333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,20952381",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,352380952",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "patient",
        "Point Name":
          "Patients love when a nurse helps them with the introductory HUMIRA dosage.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "All The Humira Accessories Are Pink 14 July 2017 Look at that wicked grin! This woman supervised me stabbing four needles into my tummy roll (aka subcutaneous tissue) this morning. I didn't know the introductory Humira session involved four doses and just started laughing when she told me. Jo is the best, most gorgeous practice nurse, and would have let me know what to expect when we made the appointment. But someone else made the booking and today was her first day back following the death of her father. Anyway, it wasn't a big deal. The Humira pens work like epi-pens so you don't see the needle. Jo reckons my face didn't so much as twitch (I'm so badass.) Nevertheless, the tum was a tad sensitive after four stabs. I do the next dose (two) at home; thereafter one fortnightly. So now we just need to hope that a) it works, and b) it doesn't make my cold worse this weekend, being a massive immune suppressant and all that jazz. On this day last year we were in Paris for Bastille Day. The Champs Elysees was closed to traffic and hundreds of thousands of happy people of every race & creed flocked the streets to enjoy the entertainment, in a spirit of peace and sharing. But I'm also remembering the people who died in Nice that night; victims of hatred. Today marks Day 14 of my alcohol-free Dry July campaign. An anonymous donor contributed $300 towards my fund raising efforts for cancer support services. So generous. I've eaten a few compensatory sweet treats but on the whole my food has been healthy (pictured is tonight's cacciatore, veges and rice).",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "0,27654321",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,526239842",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,08378390203",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,2623333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,141034404",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,330371383",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0,054834055",
        "Love  / Digust Value (Lay)": "High",
      },
      {
        "Point Type": "Love",
        Stakeholder: "patient",
        "Point Name":
          "Patients love testing alternative approaches to taking their HUMIRA (e.g. leaving it out for an hour before injection, etc.).",
        "Theme Score by Point 1": "Experience",
        Quote:
          "I was going to post this in my story but think my #warriors should have this whenever they need it. A fast how to with #humira , i'm not here to do anything but support the communities whatever med choices you make. I highly recommend leaving your Humira out for about a hour before you take it. (Also you can use your leg, I just think it hurts more) #hidradenitissuppurativaawareness #autoimmunedisease #humira #howto #realfast #hidradenitissuppurativa #hidradenitissuppurativawarrior #hopethishelps #howtohumira #oldmeds #thatwaslike3kmeds #invisableillness #chronicpain #chronicillness",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "0,25",
        "Sentiment (Lay)": "Medium Low",
        "Love / Hate Score": "0,5",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,08378390203",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,2623333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,125",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,375",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "patient",
        "Point Name":
          "Patients love when the HUMIRA process is simple and inexpensive.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "@KrishGrey That's great that you could do that. I need Humira, and they have a great discount program, but only if your insurance pays half. My insurance doesn't want to, and trying to fight with them or find other ways to get it is so exhausting.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,23544137",
        "Sentiment (Lay)": "Medium Low",
        "Love / Hate Score": "0,494635695",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,08378390203",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,2623333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,167446524",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,327189171",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "patient",
        "Point Name":
          "Patients love when they receive notification that their HUMIRA is approved and is in the mail on its way.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Today has been a surprisingly great day. Woke up in less pain (didn't last but that's ok), was able to attend a support group meeting over the internet from my recliner, local hospital got me in for a stat CT angiogram (arteries weren't looked at in detail at hospital), and then the best news of all came. My Humira is finally reapproved and is in the mail. Being off my Humira is one of the reasons I got into this mess, so I have a lot of hope it will get me back to a state where I can leave my house again. This almost-month has been brutal. And I can't help but think about how fast this all came about. I literally bent over to talk to my dog and BOOM, there was pain. You just never know with chronic illness. However, despite all the bad stuff, I am proud of my handling of it all. Understanding how the doctors would want to find nothing, knowing I needed to meet them halfway, etc. In the past, I would have pressed them to keep me in hospital until they found something; this time I knew the sooner I could rest at home, the better. And since then I have just known the goal was to keep myself as comfortable as possible, because that A) helps me heal, B) helps me get through this until the symptoms stop, and C) keeps me out of the hospital. Basically, I'm a badass guys. I walk through fire with a smile in my eyes. And I am damn proud of it.",
        "Step of Journey": "SP Ships Medicine to Patient",
        "Sentiment (Value)": "0,22727",
        "Sentiment (Lay)": "Medium Low",
        "Love / Hate Score": "0,43333",
        "Love / Hate Score (Lay)": "Medium Low",
        "Possibility of Change (RMSE)": "0,08378390203",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,2623333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,2",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,23333",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "patient",
        "Point Name":
          "Patients love being informed about the risks HUMIRA poses to their daily lifestyle choices.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Hi everyone, I'm newly diagnosed with RA and my doctor prescribed me sulfasalazine (3000 mg/day). It's been 4 months and the sulfa has helped a little with the frequency of pain, but I still have joint pain and swelling periodically. Additionally, I'm now experiencing pain in new areas (before it was just the finger joints and knees, and how it's those and the left wrist and ankle). I asked my doctor if the sulfa could be the reason why I'm experiencing these new symptoms, but he thinks it's not the medicine and it's the RA spreading to new areas. Seems like a bit of a coincidence, but he's the expert. I asked if we should wait an additional 2 months to see if the sulfa kicks in by month 6, he said that it's unlikely to have any new relief. I thought that was interesting as I've read it can sometimes take 6 months for patients to feel complete relief from sulfa. Given the spread to new areas, he recommends skipping Plaquenil and going right to Humira (in addition to sulfa). He said adding Plaquenil would only increase the chance of relief by 20-30%. A part of me is glad as the retinal toxicity risk of Plaquenil keeps me up at night, but Humira also has significant risk. We also skipped Methotrexate because I like to drink :) Has anyone gone through a similar journey? Thanks!",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,216666667",
        "Sentiment (Lay)": "Medium Low",
        "Love / Hate Score": "0,544230769",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,08378390203",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,2623333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,215384615",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,309615385",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0,019230769",
        "Love  / Digust Value (Lay)": "High",
      },
      {
        "Point Type": "Love",
        Stakeholder: "patient",
        "Point Name":
          "Patients love ideas for how to manage their HUMIRA days.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Hello, My partner was just diagnosed with Psoriatic Arthritis and will begin taking Humira shortly. I've done all the research with him and am open to helping him take the shot should he need it. I want to do more. I know he's going to probably have some symptoms - what can I do to make it easier for him? My friend, whose husband has to take a shot for similar reasons, suggested that I make shot day a \"cheat day\" of sorts - eat what we want, watch movies, and generally just veg out. Do you guys have any suggestions for what you like to do on your shot days? Any suggestions for me on what I could do to make this easier for him?",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "0,2",
        "Sentiment (Lay)": "Medium Low",
        "Love / Hate Score": "0,500003",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,08378390203",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,2623333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,16667",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "patient",
        "Point Name":
          "Patients love to learn more about indications and what HUMIRA prioritizes.",
        "Theme Score by Point 1": "Product",
        Quote:
          "Hello everyone, I will have been taking Humira for a year in October, having been diagnosed with psoriatic arthritis last October. Thankfully it has a been a blessing as my arthritis symptoms have all but vanished, save for the occasional minor swelling in my knee which thankfully doesn't hinder walking (as compared to the absolute blimp my knee was prior to Humira.) But unfortunately, my psoriasis which is on my scalp and pubic area, is still in full vigor. It doesn't help that I have a compulsion to pick at the scales- but has anyone else noticed that their biologic only helped with one aspect? arthritis > psoriasis or vice versa? Was just curious- thank you all! This sub has been a blessing to me since before official diagnosis.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,16667",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "0,57894",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,08378390203",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,2623333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,15789",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,31579",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0,10526",
        "Love  / Digust Value (Lay)": "High",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "patient",
        "Point Name":
          "Patients find it painful when they have no way of confirming if humira has failed or not.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Out of all the identities I take on, chronically ill is one of the hardest. These past two weeks have been emotionally and physically tolling. I've been in a flare that would not stop. Today I had my third colonoscopy to confirm that my Humira isn't working. I've only been on it for seven months. I want relief, but the process is so long and painful and expensive. I'm so incredibly grateful for my support system (my church family, my best friends, my blood family, my coworkers) who constantly check in on me and help me through such hard days. Here's to hoping better days are ahead.",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "-0,111111",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,4375",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,08339443178",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,1466666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,25",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,1875",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "patient",
        "Point Name":
          "Patients find it painful being denied a replacement biologic after failing humira.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "I have Ankylosing Spondylitis and Inflammatory Bowel Disease unspecified either Crohns or Ulcerative Colitis. I applied for SSI in 2019 and after a hearing approved mid 2020. I reread my approval letter and at the end it states: \"Medical improvement is expected with appropriate treatment. Consequently, a continuing disability review is recommended in 24 months.\" Now I'm about ~10 months in and I've failed humira and denied thr first replacement biologic now waiting for a second one to be approved. I was told since I developed antibodies to humira there are high chances I'll develop them for other biologics too. I'm worried my benefits will be revoked either by irrationality or legitimate reasoning. The conditions I have are lifelong without a cure and the medicine to treat symptoms haven't fixed me up to 100% and now currently at 0% for the last month. Is there anything I should do to prepare for a CDR? I'm anticipating a CDR rather than the short form. I hate having to defend myself over these invisible illnesses. I've been doing it my whole life and when I got approved I thought I could relax and now I'm stupidly stressed over this. I've already debated with myself dozens of times whether or not I deserve disability and having this constant moral dilemma is crippling beyond reason. Sorry for ranting I'm anxious over the future. Tl;dr: Worried over SSI review, wondering what to know about CRP's and reviews in general for SS. Also an uninteresting rant.",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "-0,130435",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,34375",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,08339443178",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,1466666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,25",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,09375",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "patient",
        "Point Name":
          "Patients fear a future of cycling through biologic combinations once humira fails.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Today marks the start of my 7th medicationto combat this autoimmuneVoldemort that I've been struggling with. That's seven drugs over four years. Seven different drugs and four years of my life with absolutely no results  no improvements to pain and sometimes, the side effects of said meds were worse than the disease symptoms itself. That's a lot of time, a whole lotta wasted time spent in pain  sometimes not being able to even get out of bed; it's also a lot of money spent on copays (hospital visits, doctor's visits, specialist copays and medication costs) and testing (MRIs and MREs and x-rays and CT scans) and then even more money spent on other meds to help combat the new symptoms. I've lost clumps of my hair (Cellcept), gained 70 pounds (Prednisone). I've had site injection reactions that have left my thigh bruised and legs swell so badly, I could cook an egg on them (Actemra). And, worst yet, I stopped breathing (Remicaid  luckily got that infusion in a hospital). I've also had medications not work at all, like methotrexate, Imuran and Humira, despite being on the highest dosage legally possible. I don't know that I will ever be able to inject myself without pause, scared and questioning whether or not I can do it. You're taught from a young age that injecting yourself with something is bad. In fact, unless you're a clinician, just stay away from needles altogether! So, to have to do it, all the while remembering the steps to take for safe injecting, is hard stuff. I need to remember to swab the area, pinch, push, click one is good, click two means it's almost done but not quite, then look for the green fluid, but remember to unpinch THEN remove the needle from its 90 degree angle. See? It's hard. New routine or not. But, I did it this evening. I injected my first dose of Cosentyx. And I will do it once a week for 5 weeks, and once a month thereafter. I will remain hopeful that my body responds to the medication: that the side effects don't outweigh the potential of the medicine. That I start to see clearer, that my joints give me less and less trouble as the medication, we hope, works. This is the first medication I am taking that's on-label use  meaning that the disease I've been diagnosed with (AS) is actually on the label for diseases that the medication treats. And, not to mention that Novartis, the maker of the medication, is paying my $300 copay for me (thanks Novartis!) Because, I am really tired and can't think about trying a 8th medication. And besides, 7 is a nice, odd number (I prefer them over even ones) not to mention, 7 is my absolute favorite number! So, send all the good juju mojo that it's also as lucky of a number as people have told me it is!",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "-0,26923",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,426584",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,08339443178",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,1466666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,23677",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,189814",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "patient",
        "Point Name":
          "Patients find it painful when they realize their provider has been paid to promote humira.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "THIS IS NOT OKAY I love Julianne Hough. But it really upset me to see her most recent post where she promotes speakendo.com which is a website run by Abbvie. Abbvie is the creator of Lupron and Orlissa, even Humira (humira is not used to treat endo)! I did 3 months worth of the Lupron injection 4 years ago, and I am struggling with symptoms that won't ever go away. Bone density loss, fatigue, hair loss, brain fog, hot flashes, night sweats, receding gums, anxiety and depression. Lupron and Orlissa are drugs that do not even treat endometriosis, they suppress the hormones by shutting your reproductive system down! It is essentially medically induced menopause. It does NOT work! The gold standard for endometriosis treatment is excision surgery performed by a specialist—(Swipe to learn more about excision) It just makes me so angry to think about all of the women who will see her post, and think that Lupron or Orlissa is what will cure their pain. My doctor had me convinced it would cure me, and it made everything worse. She is getting paid to promote drugs that will cause horrendous permanent side effects. This is why we need to spread awareness» This is why I share my story. If you have endometriosis and you wanna chat more about this, message me",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "-0,315789",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,366663",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,08339443178",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,1466666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,23333",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,133333",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "patient",
        "Point Name":
          "Patients find it most painful when they need to wait a long time for authorization; up to a month in most cases.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Had to wait a month to get insurance to approve humira, and now I have to wait another month for my rhumatologist appointment to get it becuase they won't give it to me without an injection demonstration, even tho I've been injecting since I was 8. I went to my old rhumatologist in October and they had a different dr that day who dismissed me when I said I was progressing and didn't do anything more than a brief physical examination not even blood work. It's safe to say I've progressed a ton since even with methylprednisolone. I'd been struggling to push the break pedal down and im doing a 17 day schooling program that entails 4-6 hours of driving a day. Well today I was dead stopped in traffic for a good 10 minutes and when I was looking into the distance I hit the guy in front of me because my foot came off the break pedal a little without my noticing. I know that's my fault for not looking in front of me the whole time, but we weren't going anywhere anytime fast, and I cant help but to blame the ra a little bit. I've been in remission most of my life and adjusting this much is new to me. I know it's my fault I'm just very frustrated.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "-0,333333",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,4999997",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,08339443178",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,1466666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,2142857",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,285714",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "patient",
        "Point Name":
          "Limited options after failing HUMIRA and developing antibodies.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Ok. So, I had my first 300mg loading dose of Coxentyx (DAY 0) on Monday. It's now Thursday (DAY 3). Since I weaned myself off prednisone for an MRI a few weeks ago, I have been debilitated by PsA, Ankylosing Spondylitis & a flare of my skin. (I was on prednisone because Humira stopped working, dead in the water, at 6 months because I developed antibodies, same story for Stelara after 18 successful months.) Since coming off the 'roids, I've been taking between 1200 - 2400mg of ibuprofen a day (sometimes more) and Ativan to sleep at night, just to exist. My PsA is like a pinball, changing locations over the months... but it affects the ligaments/tendons in my feet, ankles and palms, and the joints of my toes, my wrists, one thumb, one index finger, my shoulders, spine, hips, knees.... I mean, suffice to say, every kind of movement brings a symphony of pain. In the last 2 weeks, my rather controlled (but still existent) psoriasis has been in rebound horror mode. Super flare. I have had psoriasis since I was 18 and I'm 44 now and though I've never had a total remission, I tend to only get psoriasis in certain locations. Until now. I've got wee spots forming in entirely new places! Not cool! Anyway, today is Thursday. It's only DAY 3 of treatment, as I mentioned. So far, I've had stomach upset, diarrhea, a bit of a headache, a low grade fever on exertion and a great deal of fatigue - oh and a bit of an injection site reaction but only at one injection site (I have to use two). I mean, I never feel great, so it's not a huge difference to feel shit, but the stomach thing and headache is unusual and the fatigue is pretty extra. HOWEVER... in the last 24 hours, I've only taken 200mg of ibuprofen. And I'm actually walking and getting about, able to pull up my pants and such without yelping and general devastation. Still inflamed, of course, but the difference is noteworthy. I want to say that it's the drug, working already. But, me being me, I need to play devil's advocate: as my stomach has been upset, so I've been eating very little and only super basic unprocessed stuff, gluten free, avoiding any L-argenine containing foods (brown rice, chocolate, raisins, peanuts, etc. - because they cause cold sores if you have the virus and immunosuppression can really trigger that off). So. Here's my quandary: Is Cosentyx helping THIS quickly?! (I had a sensationally fast reaction to Stelara, BTW, and my psoriasis was in partial remission within 2 weeks, so it's not totally unheard of) Or Is the starvation diet of upset stomach and clean eating to thank? Not that I mean for anyone to actually answer that. Just food for thought. I posted photos a few days ago in my intro thread. I've decided to come off Dovobet ointment for my skin at the same time as starting the cosentyx, just to see the actual results of the medication. It's my goal to be ibuprofen free ASAP because I'm also trying to get my gut health in better shape with expensive probiotics and prebiotics and it seems a shame to keep damaging my digestive (and other) organs with so much of that if it's not absolutely necessary to function. At any rate. I was nervous and resentful about having to go onto another biologic at first, fearing the worst in terms of side effects and being generally negative and depressed about the whole thing because I'm tired of all this BS. Now, I'm relaxing and hoping for the best. And to y'all as well. Good luck! Moxie",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "-0,340909",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,4090908",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,08339443178",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,1466666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,1212121",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,2424242",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0,0454545",
        "Love  / Digust Value (Lay)": "High",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "patient",
        "Point Name":
          "Patients are afraid when there’s no plan to prepare for starting humira or how to do the things they enjoy such as travel.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "So my derm is going through the process of getting me a prior authorization for Humira. I don't know how I feel about taking it. I was on spiro for about 6 months. The open areas I had remained, but I didn't really get any new ones. Is this essentially all Humira does? Am I best off just staying on the spironalactone at this point? I'm pretty sensitive to medications and always get some of the side effects. She wanted me to try metformin and I did for like 5 days but my stomach was killing me and it was so bad I had to stop. Any suggestions are welcome.",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "-0,349785",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,468885",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,08339443178",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,1466666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,28349",
        "Trust / Fear Value (Lay)": "Medium",
        "Joy / Anger Value (verbatim count mean)": "0,171265",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0,01413",
        "Love  / Digust Value (Lay)": "Medium High",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "patient",
        "Point Name":
          "Changes in copay cards while a patient is on HUMIRA that lead to them being kicked off by insurance.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Hi, I'm looking for guidance and support if possible. I'm a 33 M (overweight), I suffer from anemia of chronic disease and Hidradenitis Suppurative for years. My HS treatment consisted of Humira and some antibiotics. In January my company changed insurance and had to drop my Humira after 2 years. I saw a new doctor that is getting me into Remicade (for my HS) but we are still in the process of insurance approval. 2 months ago, I started getting joint pain (first it was in one finger on my left hand, then 2, then 3, then index from right hand, then my right knee, in the last 2 weeks my feet and toes as well as my left elbow and my chest have been added) I saw a rheumatologist and she did X-rays 2 weeks ago, and ultrasound in my knee, as well as blood test. She told me I have some kind of inflammatory arthritis but doesn't know which one. I got put on 15mg of prednisone, and methotrexate. The prednisone I feel like help a little bit at the beginning, but after the first week it stopped improving my situation. From the blood results I got a Sed Rate of 116 H, and a CRP of 61. The r factor came out Normal. I have read a lot online and those results are scary, and it says it makes it likelier to have a heart attack. I have been freaking out a couple times thinking that I'm getting a heart attack and went to the ER and they did test and everything was fine, I also went to a cardiologist that did an ECG last week and told me I'm too young and not more test were needed, but I still have days that I feel like something is wrong because of my chest and arm pain. I know it can be costochindritis, but how do I know the difference? I don't want to have to go to the ER every week and spend hours there. Also, at the same time, I'm afraid of my fingers and other joints never going back to normal and that this is it, for the rest of my life. Difficulty walking, very hard to open a bottle or even button my dress shirt. Should I ask the doctor to up the steroids more? The Remicade is supposed to get approved next week, would that take too long? Can my fingers and toes and knee go back to normal? This is all so new for me that I'm terrified. And I know you guys can't give medical advice, but I feel like some experience advice could help me Thanks,",
        "Step of Journey": "SP Confirms Benefits With Payer Plan",
        "Sentiment (Value)": "-0,45",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,347024",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,08339443178",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,1466666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,20192",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,145104",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "patient",
        "Point Name":
          "Patients find it painful being forced to switch to another biologic because of insurance of other factors non provider-related.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Hello I am new to the group and I was hoping to get some insite or advice. A little bit of back story, I was diagnosed with JRA when I was 16 after dealing with 4 years of pain that was initially put off as growing pains. Its was okay most of the time, mostly aching, but there were days where I would have to crawl around because I could move or stand up without severe pain. I was on methotrexate (going up through the years) for the longest time and about 2 years ago i switched to humira which I loved. I am now 24 and had to change medication at the beginning of the year. Then I had my tubes tied last year and started having more arthritis symptoms. I developed more swelling in my spine and vasculitis on my legs, hips, thighs, stomach and arms. We have gotten it to tone down by switching my work area, since we think my immune system was irritated with the chemicals I was working with since I was forced to move departments due to unrelated issues. I still have small flares of vasculitis on my legs since moving back to my original department. Is vasculitis another sign of arthritis getting worse? I feel like if it's not being managed correctly idk what to do. I am not taking xeljanx xr and another medication and well and I still feel like it's not doing enough. Sorry if this is mostly rambling, I'm just getting a bit frustrated. Thank ya.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "-0,45555",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,406745",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,08339443178",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,1466666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,220238",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,186507",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "patient",
        "Point Name":
          "Patients exhibited most disgust when they saw unrealistic humira commercials, knowing their life on maintenance is not at all like what’s advertised.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "I really can't stand these commercials for drugs that show vignettes while disclosing all the side effects. The Humira ad is the worst. Actors dance and smile at the camera. They look so happy, but are they experiencing anal leakage?",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "-0,46666",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,669642",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,08339443178",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,1466666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,205357",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,330357",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0,133928",
        "Love  / Digust Value (Lay)": "High",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "patient",
        "Point Name":
          "Patients find it painful to “test” medications they need to fail before they can be considered for HUMIRA.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "So one year ago I was diagnosed with psoriatic arthritis, and I thought I would tell my story. I started noticing pain/stiffness in both hands first, then in my right foot, and then finally in my lower back. Also, I started having insane amounts of fatigue. I had a pretty bad limp for a bit there, so I went to the doctor. He performed a physical and blood work, and sent me to a podiatrist. After examining me the podiatrist said he thinks I have some form of arthritis(he said his guess was PsA) and gave me some medrol to try. The medrol was a godsend. 3 days into taking it I felt like a different person. I went back and told him what happened and he referred me to a rheumatologist. Went to the rheumatologist and he performed so many tests with so many needles. I was living on the medrol at this point but hated it because it made me quite emotional. Once he got the results he diagnosed me with PsA. Finally! I know what I have! He took me off the medrol and gave me azulfidine. The azulfidine worked pretty good after about 4 months, but I started having serious side effects and had to stop taking it. I am sure azulfidine works for some people, but it really affected my mood and made me act a little crazy. The rheumatologist suggested Humira, so we submitted it to my insurance company. My insurance company said I have to try methotrexate first for at least 3 months before Humira will be approved, or have an adverse reaction to it, so I started taking that. I have a love/hate relationship with methotrexate. I have been on it for 5 months and my hands and foot feel great. My back not so much. I also lost most of my hair, so I started shaving my head. The methotrexate causes all sorts of stomach issues and makes me really tired. I told the rheumatologist this and he wants to add a second medicine for my back, most likely Humira. Has anyone here taken methotrexate and a biologic simultaneously? If so, how did the combination of meds affect you? Overall, the past year has been a challenge. I am thankful that I have such a supportive family. Too bad I can't say that about my friends and co-workers. Hard times really show a person who is in their corner and who is a fake. If you are struggling with arthritis, please don't give up. We all get knocked down in life. What matters is you keep getting up and fighting. Please be a fighter.",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "-0,48684",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,596522",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,08339443178",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,1466666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,26882",
        "Trust / Fear Value (Lay)": "Medium",
        "Joy / Anger Value (verbatim count mean)": "0,246621",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0,081081",
        "Love  / Digust Value (Lay)": "High",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "patient",
        "Point Name":
          "Lack of support for how to talk with insurance providers about humira treatment needs.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "My rheum wants me to switch to Humira due to my migraines interacting with lef and sulfa. What should I know before the switch? Are there symptoms and side effects that weren't listed? Any American insurance issues tips or tricks? Things you wish you woulda known before you started? Thanks!",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "-0,5",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,4",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,08339443178",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,1466666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,2",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,2",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "patient",
        "Point Name":
          "Patients find it painful when there’s a lack of information on treatment side effects; general education around humira.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Happy shoot up Monday!! Crohns disease is linked to an overproduction of certain proteins like Tumon Necrosis Factor. Humira is a drug that works to block TNF by binding to it. This reduces inflammation in the body putting a Crohns warrior in remission. The first year on this drug the shots were so painful I had to get other people to inject me. But since then they have taken out that part and I can successfully do it myself. Whoop whoop.... still hate needles though. But as I continue on figuring out why I still feel like I am starting to think it's the side effects of humira: nervous system problems: lightheadedness immune reactions psoriasis: new or worsening headaches: migrains and clusters nausea I just need a doctor to agree with me instead of telling me it's all in my head #crohnsdisease #invisibleillness #crohnsdiseaseawareness",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "-0,53139",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,42923",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,08339443178",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,1466666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,23965",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,17982",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0,00976",
        "Love  / Digust Value (Lay)": "Medium",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "patient",
        "Point Name":
          "Patients feel most pain when there is poor communication between them and their providers about humira approval, treatment failure, side effects, etc.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Female age 24 Height: 5'1 Weight: 190lbs. Struggled all my life with gaining weight, even with diet and exercise since 12 years old. Meds - BC for heavy periods, Vitamin D, magnesium, Florastor probiotic, dicyclomine for IBS cramps. Diagnosis- IBS-A from Gastro. Had a colonoscopy in 2018 all clear. Endoscopy in 2019 all clear. Abdominal X-rays and CT in 2017 and 2018 and 2019 shows gas and constipation. I have had high inflammation levels for over a year. I went for my yearly physical last September and complained of lack of energy, gaining weight even with diet and exercise, fatigue, frequent headaches, brain fog, lower back pain after activity (gets better with rest), recurrent stomach issues (diarrhea and constipation, mucous in stool, urgency at times). He did many blood tests but the two that came back abnormal were my CRP and ESR. Was sent to a Rheumatologist, he did many other tests for RA, Lupas, etc. all came back ok. He treated me as RA because of my high levels of inflammation and started me on Plaquenil. That medication gave me extreme diarrhea for multiple weeks, I could no longer take it. He decided to start me on biologics like Humira, and I am waiting for insurance approval. Fast forward a few weeks I saw my Gastro, she wanted to test me Celiac and also do a special Catscan that focuses primarily on the small bowel to look for Crohn's disease. She said she sees high ESR and CRP with Crohn's. I get my celiac test back and I have no evidence of a gluten intolerance but I do have high IgA my level was 409 (normal range: 47-310) So my most recent test results of last week show these flagged: IGA: 408 CRP: 38.5 ABSOLUTE EOSINOPHILS: 0 (low) SED RATE BY MODIFIED WESTERGREN: 31 RED BLOOD CELL COUNT: 5.27 No doctors seem to be too worried, my rheumatologist seems happy just treating me like RA. But I am not sure if I should be. I am not sure what it is that is causing so much inflammation and I am so confused. I am worried about cancers with all of my high levels and I am actively trying to better myself with diet, exercise, therapy. Should I be concerned?",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "-0,549089",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,516244",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,08339443178",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,1466666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,315844",
        "Trust / Fear Value (Lay)": "Medium",
        "Joy / Anger Value (verbatim count mean)": "0,2004",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "patient",
        "Point Name":
          "Patients find it painful to not understand how their bodies are going to react to taking HUMIRA; lack of preparation or a plan for how to manage.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "After trying a million different things for my HS, nothing worked. I keep Humira as my last resort and finally plunged. My dermatologist told me the plan is to be on Humira for 4 months and then proceed to surgery when the inflammation goes down. I admit I was/an super paranoid about being Humira because of all the side effects. It's freaking me out knowing that Humira is going through my blood right now and dampening down my immunity. Hopefully this is the beginning of the end of my 10 year battle with HS. Male 29 Stage II",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "-0,6",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,533333",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,08339443178",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,1466666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,133333",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,4",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "patient",
        "Point Name":
          "Patients find it painful when they haven’t had the proper training on how to inject humira on their own.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Hello everyone. I just got prescribed this whole concoction. The other option was to do Humira, which I said I'd think about because I'm scared of needles. Has anyone been prescribed all of this at once? What are your experiences? I only saw one other post with this concoction and it said they had panic attacks and red urine and all of that, which makes me terrified to start this combination. Also, I know the question gets asked a lot, but is there some sort of mass poll someone has done for the side effects of humira? What is the injection process like? Apologies for the insane amount of questions, I'm just honestly scared. I'm deeply appreciative of any responses.",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "-0,63888",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,63186",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,08339443178",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,1466666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,41208",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,21978",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "patient",
        "Point Name":
          "Patients find it painful they are unable to notify their providers about failing humira faster than what’s currently possible.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "I was diagnosed with PCOS when I went through puberty around age ten. For years I struggled with the pain and shame of what I thought and was told were cysts caused by the pcos. It was just a side effect of that disease and if I could get the pcos under control the cysts would calm tf down. I couldn't wear anything without sleeves due to scarring and active cysts, I've ruined more clothing and underwear than I can count or remember, including bedding. It's been years of shame, thinking I was dirty, if I washed more often it wouldn't happen. Intimacy has always been difficult because of my deep embarrassment about scarring. A year ago I was diagnosed with Crohn's disease, the year before that I was diagnosed with RA and fibro. I've been unable to work for the last three years due to sudden onset of these conditions following surgery. I finally went to my PCP because the cysts had become so numerous and painful that I could barely move without wincing, I had an open wound in my armpit that wouldn't heal and I was miserable. She took one look at the affected areas and immediately said Hidradenitis suppurativa. A term I'd never heard in the good fifteen years of the same symptoms. Another chronic illness, I got home and cried. And I've been crying since it seems. Little treatment options, the ones that do exist often don't work long term. With my other conditions even those limited options become more limited. I feel miserable, and Google is not helping. I'm meant to talk to my rheum about beginning remicade, after failing humira. I'm on a ten day antibiotic regimen until the swab taken is identified. Not coping well with this dx, it's frustrating. Female, overweight, non smoker, 20's",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "-0,806452",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,566663",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,08339443178",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,1466666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,38333",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,133333",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0,05",
        "Love  / Digust Value (Lay)": "High",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "patient",
        "Point Name":
          "Younger patients find it painful to know how to continue living a normal life while on humira.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "i've had hs since i was 14. it first started with a lump under my right arm, and when i went to the er they cut it and drained it, even though we told them my pcp didn't want it cut. i got my confirmed diagnosis at 15, and i thought my life was over. i remember telling myself i would commit suicide if the hs reached my buttocks or vaginal area, now almost 4 years later i have it under both arms, both breasts, groin and buttocks area. i never really got a full blown sit down explanation when it comes to my condition, so all i know is that it's something to do with inflammation and recurrent flares. i have flares quite often, and for the past 3-4 years (every 2-3 weeks, i stopped getting them in december of 2019 for about 6 months, started back receiving them in june of 2020) i've been getting steroid injections. all i know is that they temporarily stop the pain. it's a very debilitating disease and i feel as if i have been robbed of my own body. my teenage years were metaphorically snatched away from me and it has negatively impacted me in all forms. i currently take humira once a week, and i know my body must be messed up from all the injections over the years...idk what i'm even asking for in this post. maybe some tips and guidance ? i'm lost. i started college this year and i was supposed to get surgery for my spots but i had to push it back until December due to my workload. what i should be asking my doctors and such? the spots look bad and it seems as if my wounds don't ever really fully close and stop draining, i figured the flare from my right arm would heal (it has, doesn't drain much but it feels like a tract moved upwards to the upper part of my armpit like the very top) and i've been getting flares from there.",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "-0,818182",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,5",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,08339443178",
        "Possibility of Change (Lay)": "Medium Low",
        "Influence (R^2)": "0,1466666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,35",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,15",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "payer",
        "Point Name":
          "Payers love price-driven markets; MAC pricing strategies.",
        "Theme Score by Point 1": "Access",
        Quote:
          "All right, okay. Yeah, so I think what's going to happen is probably nothing when Amgevita launches, and we'll wait until there's more competition. There's going to be a lot of conversations during the first half of '23 with companies to see, what are the potential options here? The bottom line is it should be a price-driven market. Now, Amgen could come in and say, \"Look ...\" If this was handled like the good old days of generics, as I'm sure you're recalling, when a company would come and they'd say, \"Well, we'll guarantee that we'll stay low with the market,\" so you'd switch, you'd take the product and then as the market drops, they drop and you're in the best position. You don't have to switch anybody around.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,5",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,733333334",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,110147333",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,2333333333",
        "Influence (Lay)": "Medium Low",
        "Trust / Fear Value (verbatim count mean)": "0,366666667",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,366666667",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "payer",
        "Point Name":
          "Payers love interchangeable biosimilars because they don't need to be approved by the provider when switching.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Well, I said, interchangeability does give you some advantage because it means it's easier to switch from the branded product to the biosimilar. And it doesn't require involving the doc and going through all those extra steps. So that one biosimilar will have that advantage when it comes out. But the other biosimilars, as I keep saying, even the originator product, Humira, is only a biosimilar. They never kind of want that to be out there, but even the originator product, it's not identical from batch to batch.",
        "Step of Journey": "SP Ships Medicine to Patient",
        "Sentiment (Value)": "0,416666667",
        "Sentiment (Lay)": "Medium High",
        "Love / Hate Score": "0,660714286",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,110147333",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,2333333333",
        "Influence (Lay)": "Medium Low",
        "Trust / Fear Value (verbatim count mean)": "0,267857143",
        "Trust / Fear Value (Lay)": "Medium",
        "Joy / Anger Value (verbatim count mean)": "0,392857143",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "payer",
        "Point Name":
          "Payers love to be the one's making the formulary decisions.",
        "Theme Score by Point 1": "Access",
        Quote:
          "If we have two, then the specialty pharmacy now enters the fray to say, \"Well, I can make more money on Samsung, so I'm going to push everybody to Samsung,\" and they control every script that comes in. Well, maybe we don't want that to happen. Ideally, the one biosimilar is our ability to make sure that we don't have leakage and we don't give the specialty pharmacy or the PBM the opportunity to make money on us because now they're making the decision and we're not.",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,375",
        "Sentiment (Lay)": "Medium High",
        "Love / Hate Score": "0,533333334",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,110147333",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,2333333333",
        "Influence (Lay)": "Medium Low",
        "Trust / Fear Value (verbatim count mean)": "0,266666667",
        "Trust / Fear Value (Lay)": "Medium",
        "Joy / Anger Value (verbatim count mean)": "0,266666667",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "payer",
        "Point Name":
          "Payers love to see pricing differences for treatments and indications as part of the HUMIRA experience.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Not for 23. Maybe down the line somewhere. But as I said, there's always inertia to change. Hopefully when the newer agents come out and there is a pricing advantage, the docs and patients will start making that move already. And only when that pricing differential becomes significant would we, number one, require that they try a biosimilar before going to Humira. And the possibility down the line. I mean, there's all these agents. And if the real world experience is in line with the scientific study data, I can see that there could come a time when Humira could be excluded. But that will not be early on.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,75",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,110147333",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,2333333333",
        "Influence (Lay)": "Medium Low",
        "Trust / Fear Value (verbatim count mean)": "0,25",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,5",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "payer",
        "Point Name": "Payers love to see PBMs with less power.",
        "Theme Score by Point 1": "Access",
        Quote:
          "When Hospira launched at a 15% WAC discount, it cost money to use Hospira, which is why nobody touched the product. Then Merck launched their product at a 35% WAC discount but by then, Janssen had already amped up their rebate machine, and it was probably comparable to wherever they were at the time, around 30, 35%. I think it's safe to say, probably 35 to 40% rebates are coming in pretty standard on these. AbbVie has some degree of leverage. They, theoretically, probably aren't pushed around as aggressively as smaller companies by the PBMs, but nonetheless, they certainly have, the PBMs have some ability to push back on them as well.",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,666666",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,110147333",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,2333333333",
        "Influence (Lay)": "Medium Low",
        "Trust / Fear Value (verbatim count mean)": "0,333333",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "payer",
        "Point Name":
          "Payers love keeping their coverage strategy simple; with HUMIRA it has been simple.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Strength and size of sales force certainly is an issue, but not something that's critical for us. I don't think we really are going to rely on the sales force to any great extent as something that we really need. I think we're going to drive it because we're going to decide, it's like a generic, \"We cover brand X and only brand X,\" so that's the situation where that's not a big deal.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,571428",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,110147333",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,2333333333",
        "Influence (Lay)": "Medium Low",
        "Trust / Fear Value (verbatim count mean)": "0,285714",
        "Trust / Fear Value (Lay)": "Medium",
        "Joy / Anger Value (verbatim count mean)": "0,285714",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "payer",
        "Point Name":
          "Payers love to offset treatment decisions onto providers and patients when all choices are at price parity.",
        "Theme Score by Point 1": "Access",
        Quote:
          "We have to try our best to make the biosimilars work and try to save money, which benefits everyone. I think if it gets to the point where they all just drop, then do we really want to bother fighting the fight to say, \"Well, we want you to use brand X\"? Or simply say, \"We don't really care what you use,\" and then leave it up to the physician, quite frankly, to do the right thing, and say, \"Okay. I'm going to give Amgevita to this patient. That's the one they've been on. I'm going to stick with that, or I'm going to stick with one of the other brands.\" ",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,285714",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,6",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,110147333",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,2333333333",
        "Influence (Lay)": "Medium Low",
        "Trust / Fear Value (verbatim count mean)": "0,4",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,2",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "payer",
        "Point Name":
          "Payers find it painful to have to make the medical decisions for the providers and patients.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "We have to try our best to make the biosimilars work and try to save money, which benefits everyone. I think if it gets to the point where they all just drop, then do we really want to bother fighting the fight to say, \"Well, we want you to use brand X\"? Or simply say, \"We don't really care what you use,\" and then leave it up to the physician, quite frankly, to do the right thing, and say, \"Okay. I'm going to give Amgevita to this patient. That's the one they've been on. I'm going to stick with that, or I'm going to stick with one of the other brands.\" ",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,285714",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "-0,3",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1226419769",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,1493333333",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,1",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,2",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "payer",
        "Point Name":
          "Payers love having knowledge of all actors' incentives in the HUMIRA process.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Yeah, well, at the beginning of the year with only one alternative and probably only a modest price reduction, there won't be any step edits or preferential treatment of any kind. We've come a long way in aligning all the incentives. So the docs are now part of risk sharing pools for the most part. And a lot of the manufacturers don't realize how far down the line we are doing this. So the docs have become far more price sensitive and they used to be. And, of course, the patients have their cost sharing and they always want to be cost effective with their money. And the government and insurance companies have been trying to do this for decades.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,2",
        "Sentiment (Lay)": "Medium Low",
        "Love / Hate Score": "0,666666",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,110147333",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,2333333333",
        "Influence (Lay)": "Medium Low",
        "Trust / Fear Value (verbatim count mean)": "0,333333",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "payer",
        "Point Name":
          "Payers find it painful when doctors become more price sensitive as a result of becoming part of the “risk sharing pool.”",
        "Theme Score by Point 1": "Access",
        Quote:
          "Yeah, well, at the beginning of the year with only one alternative and probably only a modest price reduction, there won't be any step edits or preferential treatment of any kind. We've come a long way in aligning all the incentives. So the docs are now part of risk sharing pools for the most part. And a lot of the manufacturers don't realize how far down the line we are doing this. So the docs have become far more price sensitive and they used to be. And, of course, the patients have their cost sharing and they always want to be cost effective with their money. And the government and insurance companies have been trying to do this for decades.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,2",
        "Sentiment (Lay)": "Medium Low",
        "Love / Hate Score": "-0,166667",
        "Love / Hate Score (Lay)": "Medium Low",
        "Possibility of Change (RMSE)": "0,1226419769",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,1493333333",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,166667",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "payer",
        "Point Name":
          'Payers are angry about what they are calling a "network of stealth nurses."',
        "Theme Score by Point 1": "Experience",
        Quote:
          "RT @charlesornstein This is a big deal and strikes at the heart of pharma's contention that improper marketing is a thing of the past. AbbVie is accused of paying kickbacks, using a stealthy network of nurses to promote Humira via @statnews",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,45",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,133",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,251",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,25",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,2",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "payer",
        "Point Name":
          "Payers fear how 340B health clinics (those primarily treating Medicaid and Medicare patients) are set up because they can receive up to 100% rebates on HUMIRA.",
        "Theme Score by Point 1": "Access",
        Quote:
          "I really don't know what they look like today. I know there's a number of states, probably something like 30 or 40 that have passed some degree of biosimilar legislation. That's a research project on its own, but the fact that you have an interchangeable one, if I was a state trying to save my constituents some money I'd want to at least allow it to be used without too much pushback. The problem you have, however, is the best price rebates on Humira are, essentially, 100%, so the state is going ... Everybody who has three 340B contracts or everybody who is a state Medicaid is going to lose money on an adalimumab biosimilar, hands down, because they're not paying anything. ",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "-0,2",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,375",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1226419769",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,1493333333",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,125",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,25",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "payer",
        "Point Name":
          "Payers are critical of the choices PBMs make and how their choices impact rebate programs from other pharma companies and limit the payment structure – e.g. $x price for HUMIRA syringe, adalimumab syringe, etc.",
        "Theme Score by Point 1": "Access",
        Quote:
          "I really don't know what they look like today. I know there's a number of states, probably something like 30 or 40 that have passed some degree of biosimilar legislation. That's a research project on its own, but the fact that you have an interchangeable one, if I was a state trying to save my constituents some money I'd want to at least allow it to be used without too much pushback. The problem you have, however, is the best price rebates on Humira are, essentially, 100%, so the state is going ... Everybody who has three 340B contracts or everybody who is a state Medicaid is going to lose money on an adalimumab biosimilar, hands down, because they're not paying anything. ",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "-0,333333",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,3392855",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1226419769",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,1493333333",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,1964285",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,142857",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "payer",
        "Point Name":
          "Payers find it painful when contracts with PBMs and practices are shorter than 12 months.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Yeah, that's currently the way the generic market works at the PBM level. The PBM controls the MAC list, but they do it on our behalf. They basically say, \"Look, we don't care which product you use. We're going to pay you X amount per milligram, or X amount per syringe, or per kit,\" or whatever it is. That's the way you control for that. Then it doesn't matter, because you're taking AWP, and WAC, and whatever other pricing scheme is out there off the table. You're basically saying, \"We will pay $500 per month for Humira syringe, period, or an adalimumab syringe, and that's it.\" ",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "-0,333333",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,428571",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1226419769",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,1493333333",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,142857",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,285714",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "payer",
        "Point Name":
          "Payers find contracts that don’t have a price protection plan to be painful; seeing a contract without a price plan useless in one year’s time.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Yeah. Yeah. Kind of the contract to be as long as possible. You don't want to have to be going through this over and over again. You never get anything more than three years. You can get two years. But one year just means you've only got 12 months until you have to haggle over it again. So we do like it longer. And the other aspect of these contracts is price protection. Because with the way pricing increases have gone, I mean, they take double digit increases year after year. So if you don't have price protection within your contract, I mean, by the end of the year, you've lost any benefit of the contract.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "-0,333333",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,428571",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1226419769",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,1493333333",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,142857",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,285714",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "payer",
        "Point Name":
          "Payers fear they are at the will of employers and demonstrating that they are managing costs effectively; this drives them to rebates.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Well, I think especially for the plans that are custom formulary, sure. They're going to drive that. I think that's possible, but I think that it's the battle of ... I go back to the employer again. We've got to demonstrate to employers that we're managing costs appropriately. If we're not, if we're still sucking off the rebates and that's how we're going to go forward, then we're going to kill the biosimilar industry, so there's that trade-off.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "-0,333333",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,75",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1226419769",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,1493333333",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,5",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,25",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs love that HUMIRA is part of a portfolio of speciality biologics.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Yeah. Yeah. I mean, look, this whole slide, I'm going to take a different approach. If you listen to every biosimilar presentation in history, there was always a slide that said, \"We won't see the deep discounts, but if we can get 25 to 40% off, the industry will have called it a success. So if you just see where AbbVie is, and we want 25 to 40 on top of that, fill in the numbers.\" But I don't know if a all these interchangeable guys are going to... I mean, look at the European model. That's where people are. I mean, in my opinion, you have to look at where AbbVie's at, because every payer is going to sit back and say, \"Look, they're all specialty drugs. We're not putting them on a generic tier. We have rebate commitments either to our own bottom line or to guarantees that we put out there. But we can walk away from those rebates.\"",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,66667",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,8",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,4",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,4",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs love when manufacturers are competitive on WAC and 10% lower on net pricing.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Yeah. I'd say they've got a price at WAC right. Be competitive on WAC. And then somehow be like 10% lower net. I mean that's probably enough to get them to do something with them instead of just doing a flat portfolio contract.",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,666667",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,75",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,5",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,25",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs love working with health plans that are fully insured and include mature market access strategies.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Although it has proven in the past to favor some access strategies. You have to be very careful with that because that might be pleasing to a PBM, but you also have to work with health plans that are fully insured and are more about low net costs by drug. So it's a delicate balance between the two. And can you have the best of both worlds? Is really the goal. And I think that where you get challenged is just making sure that the patient at the end of the day is not being penalized by having to pay more out of pocket because of some of those formulary decisions. That's always the litmus test in my mind.",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,625",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,833333",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,333333",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,5",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs love switches that don't compromise the rebate strategy.",
        "Theme Score by Point 1": "Access",
        Quote:
          "That's right. Or else, if it doesn't, then they're going to create policy. They're going to create a process. They're not picking up and calling physicians, but they're going to have some sort of electronic PA or something, you know? I mean, they're going to be very good and effective as to how to best handle this just in terms of a patient switch. That's a switch if they decide to switch away from Humira and walk away from AbbVie. Because if it's just going to sit there at a parallel level, if the payer keeps Humira on and they just decide to add an adalimumab, any one of these biosimilars, then there is going to be no switching from the payer. I mean the physicians,the light switch, but it's not going to be driven by the payer and it can't be driven by the payer because otherwise you would compromise your rebate eligibility. So you can't do it.",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,6",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,875",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,5",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,375",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name": "PBMs love getting a MAC price on their biologics.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Well, I mean, item five, if I could get a MAC price, right, so a reference price that all the biosimilars would adjudicated to, it's not a bad option because this way, you've got a geography. You allow people to use the biosimilar they're comfortable with. So if in one geography and one specialty pharmacy likes Amgen, and another one has negotiated a great deal, I don't get in the way of that. But I can't get a MAC. We've never been able to do this. And again, it's an interesting scenario because the PBM controls the price. This assumption takes into consideration that everybody will lower their price. We're not going to cover all biosimilars, and the range of discount will be 15 to 40%. This scenario only works if we've got a MAC that it doesn't matter what price, we get it for X. This is like a traditional generic. And in a lot of ways, this is the easiest because it allows specialty pharmacies to use a product they make the most money on. So it gives you a little bit of good will. But we're covered. We get our 40% no matter what product you use.",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,6",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,714286",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,357143",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,357143",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs love working with clients who have a appealing portfolios and broad pharmacy access.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Especially pharmacy access, maybe. Again, if somebody's using a limited distribution network, that would be where it would matter. And then supply, I think, well, I jumped the gun on that one. I mean yeah. If somebody has a bad history of never having drug, that could be a problem, but I don't know if that's an issue with any of these manufacturers. Again, they're well known. They've been around forever. So the only one on there that probably resonates to me as something that would actually influence the decision would be the portfolio opportunity.",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,536054422",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,711904762",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,339285714",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,372619048",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs love options when choosing biosimilars over HUMIRA; interchangeability may matter.",
        "Theme Score by Point 1": "Access",
        Quote:
          "I think that because there's going to be a lot of demands from the senior executives and social groups and whatnot to embrace this biosimilar because it's the number one in the world. So I think that scenario number two is very likely, not necessarily in '23, but in '24. And a lot of this is going to be driven by what AbbVie allows in a contract. And if AbbVie allows or does not require that they are the exclusive adalimumab, then this is a very likely scenario. And I would say that interchangeability... I mean, again, that's the million dollar question. It's going to matter more than later. So I'm going to say, if this exercise is for '23, interchangeability will matter. I'm saying that very... Not as confident.",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,5",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,761904761",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,226190476",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,464285714",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0,071428571",
        "Love  / Digust Value (Lay)": "High",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs love having leverage with biosimilars coming to market to help negotiate HUMIRA contracts.",
        "Theme Score by Point 1": "Access",
        Quote:
          "That's why I think, at least in my initial look, and again, we could change our mind five times, but the initial look is you go to AbbVie now, and you say, \"Okay, I'll guarantee you all of 2023, but you got to give us an incremental discount of 15 to 20%.\" They could laugh you out of the building, or they could say, \"Yeah. If we get all the plans to take the brand, and we try to figure out a way to make the members harmless on this thing, then we'll let the biosimilars fight it out, put it out the bid for '24 and see who comes in, who can supply the market, who provides the best value, etc., and just make it a '24 event.\"",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,5",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,666666",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,333333",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs love the idea of bundling HUMIRA with a biosimilar as part of a formulary.",
        "Theme Score by Point 1": "Access",
        Quote:
          "It's probably number three after Stelara, but it is very big product with, I don't know, 20, 30% market share probably in autoimmune space. Still is a huge, huge product. One of the big three is they used to call them Remicade, Enbrel and Humira. So they can bundle it. Plus they also have Cyltezo, which just received additional indication and was already had sizeable market share. So it's another powerhouse. It's possible to bundle their biosimilar product with Enbrel and if I'm AbbVie, I'm sorry, not AbbVie, Amgen executive, that's what I would be thinking. Maybe they are thinking, I don't know. So in any event, my kind of thinking is that probably would make the most sense for everyone to keep Humira certainly and add another biosimilar. And Amgevita I think is in prime position to get it done.",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,5",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,6",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,2",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,4",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs love the idea of parity coverage among biosimilars and HUMIRA.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Now, can we achieve that? I don't know. Right? We may fall in love with BI, and it's great price, and it's interchangeable. And then when two more comes, somebody does something disruptive, and we want to go in that direction. And I'm not sure we're going to be able to keep people all in one biosimilar for the rest of our lives. I mean, I'm quite certain we won't, but big picture, Mary, to me, it's a transition of parity coverage, whether it's one or whether it's two, to ultimately a biosimilar only, whether that's two, whether that's one. That's the way I see it playing out. That's the responsible way to do it. If you're United, maybe you just go to one. But even the big guys haven't done that in other areas. So it's really, what will AbbVie allow me to do? Will they allow me to do one or will they allow me to do item two? So I can have an optics to the market that says, \"I'm covering a biosimilar. I'm giving choice. I'm giving both right now.\"",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,4",
        "Sentiment (Lay)": "Medium High",
        "Love / Hate Score": "0,714285",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,142857",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,428571",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0,142857",
        "Love  / Digust Value (Lay)": "High",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name": "PBMs love having preferred status with HUMIRA.",
        "Theme Score by Point 1": "Access",
        Quote:
          "They probably, in order to get a cooperative status with Humira, like I said, exclusive status, that would be unlikely. I think it's more plausible that if they will get preferred status, that would be co-preferred with Humira. Honestly they probably would need to offer in terms of a list price about 50% or more lower than what Humira's list price.",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,75",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,25",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,5",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs love when a biosimilar is interchangeable for specific indications and not all.",
        "Theme Score by Point 1": "Access",
        Quote:
          "I like it because we use that interchangeable only for GI conditions. So, even though we never had an issue with the biosimilar for Remicade, and I don't foresee an issue with adalimumab biosimilar, but-",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,666666",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,333333",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs love robust patient assistance programs to help cover the cost of HUMIRA and other biologics.",
        "Theme Score by Point 1": "Access",
        Quote:
          "I didn't think that having no biosimilars covered for the entire year would put a plan in a position where payers are supposed to support a low cost option. Even though these things are high cost, high rebate, the member is not benefiting from that. And so with deductibles being such a common benefit design now, even though these specialty products are typically covered through other patient assistance programs, the only part I would question here is the non-covered of any biosimilar for the entire year. It might be for the second path where we might have something covered or even the fourth quarter, we might look to have something covered for a biosimilar.",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,6",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,4",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,2",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs love discounts on biologics (via WACs or overall lower net cost).",
        "Theme Score by Point 1": "Access",
        Quote:
          "For example, let's take a look at Remicade. So, Remicade, we've always had a very generous, a very deep discount from Janssen Pharmaceuticals with Remicade. And when the biosimilars were launched, they launched at a WAC price that was slightly higher than the net cost of Remicade. So, with that, we kept Remicade covered and excluded the biosimilars until we started having that conversation with the manufacturers of the biosimilars where we're able to negotiate a decent lower net price. At that time, we left Remicade and one biosimilar, infliximab, no, I can't remember it now.",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,5",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,25",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,25",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs love tracking data on manufacturing processes that will help them prepare for future situations.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "And we spent years putting together data in anticipation of all those conversations. But I'm not even sure we're going to have to do it, use it anymore. I mean we had data showing that if you'd been on Remicade for 20 years, you'd actually gotten like 40 different products. Because of manufacturing changes and all kinds of other stuff that was documented. Right. So anybody came back and said, \"I can't switch to...\" I'm going to say, \"Well you've been switching anyway. You just didn't know it.\"",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,5",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,25",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,25",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs love contracting with manufacturers for biologics in the same therapeutic category.",
        "Theme Score by Point 1": "Access",
        Quote:
          "So, when we say a portfolio opportunity with two of the manufacturers products, if it's not what within the same therapeutic category, I'm not interested. If it's with a different... So, if they want to contract with two other manufacturers products that are not in the same therapeutic category, not interested.",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,333333",
        "Love / Hate Score (Lay)": "Medium Low",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name": "PBMs love leaving treatment decisions to the provider.",
        "Theme Score by Point 1": "Access",
        Quote:
          "And it kind of makes everybody happy. Right. So you're not making a doctor switch who doesn't want to, even though it doesn't matter.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,333333",
        "Love / Hate Score (Lay)": "Medium Low",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs love preparing their formularies with products they can clearly anticipate being approved (including manufacturing process).",
        "Theme Score by Point 1": "Access",
        Quote:
          "Oh yes. Well, we have to, but then also, yes, just because of when the formularies were filed. And, again, that's where I have to go back. I should have read it beforehand. It was around that. I know I read it, but I haven't and got any other opinions on it with the memo that came out around people using the biosimilar for, for interocular injections. So, no, granted, that was a completely different site. But they came out with some pretty strong language in there about what was right, in the eyes of CMS, and what was not. So, that that interchangeable piece could become very critical, there, for a 2024 formulary. And, again, that's probably where... I'm even hesitating now. It would have to be different because, until they get FDA-approved... I'm thinking out loud right now. But they wouldn't be able to give us a WAC, or probably have an idea of what the rebate is going to be in 2024, because the products don't get approved... aren't fully on the market until July. ",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,311111111",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,483333334",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,316666667",
        "Trust / Fear Value (Lay)": "Medium",
        "Joy / Anger Value (verbatim count mean)": "0,166666667",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs love biologics with a wide range of strength formulations (Low + High Concentration) covered.",
        "Theme Score by Point 1": "Access",
        Quote:
          "However, Mary, I just want to say this, if let's say Amgevita is not preferred or not covered until July and basically until July, we keep status quo, we keep Humira covered and no biosimilars are covered and if every one get the same start, then I think Cyltezo would have 80% of all products. With a caveat, again, I don't know, from the top of my head, how many strengths, how many formulations Cyltezo has compared to some other ones, because they all have different portfolio in terms of strengths and vial size and formulation and not vial, injector size and formulations and things like that. But assuming roughly similar, which I don't know whether it's a right assumption or not, then Cyltezo should dominate the market, assuming the same start for all of them.",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,285714",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,5",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,25",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,25",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name": "PBMs love flexible contracts with manufacturers.",
        "Theme Score by Point 1": "Access",
        Quote:
          "I honestly think that they might, but a lot of these have been waiting in the wings, they've had their FDA approval for several years now, and they're just waiting in the wings to be able to launch their products. I do not think that they will... I really think that some of these products that have interchangeability will come out at maybe a premium price. That may be a disadvantage to them. They may come out at a premium price, but the other thing is that are they willing to negotiate contracts to get down to a lower net cost? I don't know. I don't know what they're thinking. For sure, Pfizer, no. For sure, Pfizer one has not learned that lesson, right?",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,278174603",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,496428571",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,230952381",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,26547619",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs love preparing their formularies with products they can clearly anticipate being approved.",
        "Theme Score by Point 1": "Access",
        Quote:
          "And, maybe, once the first product launches in January, we'll all feel a little bit easier about it. And knowing how many should be approved in that timeframe, maybe you feel better. But, if you tie your horse to one of those products, and they end up having... In COVID, I don't think they have any lab issues or anything else. But they haven't done a lot of onsite inspections through the COVID. Only thing it takes is something like that to delay it. Then, you selected a product that doesn't have an approval. ",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,25",
        "Sentiment (Lay)": "Medium Low",
        "Love / Hate Score": "0,5",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,166667",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs love indication-based contracting to accompany indication-based formularies.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Yeah. So that's the X factor, that's the unknown. So I will say this. As you know, this category is the biggest spend category we have by double over MS oncology. Oncology Is catching up to it, but this is the biggest category we have. It contributes to about half of our rebate guarantees. So as a PBM, when we go out to RFP, we have to provide rebate guarantees to clients. And that's literally one of the main reasons how brokers recommend PBMs to employer groups and the health plans, is based on how big their rebate guarantee is. So this category, and this decision has wide-ranging complications. The other thing, I think mentioned this yesterday, is that we have indication-based formularies, but not indication-based contracts. Meaning that if you look at psoriasis versus RA versus Crohn's, they look different because all the drugs have different indications, but when I sign a contract on a drug, I have to sign it on the drug. I don't get to pick and choose which indications I get a rebate on.",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,25",
        "Sentiment (Lay)": "Medium Low",
        "Love / Hate Score": "0,25",
        "Love / Hate Score (Lay)": "Medium Low",
        "Possibility of Change (RMSE)": "0,1347235299",
        "Possibility of Change (Lay)": "High",
        "Influence (R^2)": "0,2463333333",
        "Influence (Lay)": "Medium",
        "Trust / Fear Value (verbatim count mean)": "0,25",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pbm",
        "Point Name":
          "Ingredient shortages that may result of a pharmacy being forced to carry only biosimilars.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Yeah. I'll just go down and see if they matter or not. High level. Reputable manufacturer probably doesn't matter. These are all reputable manufacturers. Samsung, they're big. Now it's Organon and Merck anyway. Pfizer, Amgen. I'm not concerned with that. So we're not making decisions based on who the manufacturers are, we're basing the decisions on their cost of their drug. And I don't have any issues with these. This isn't like some unknown company from Pakistan that I've never heard of. Right. But the other thing is the FDA not only approves the drug, but they approve their manufacturing process. So the only way that matters would be maybe the second one, the history is if they've had history of drug shortages or something like that. But again, I'm not, superly concerned about that.",
        "Step of Journey": "SP Ships Medicine to Patient",
        "Sentiment (Value)": "0,222222",
        "Sentiment (Lay)": "Medium Low",
        "Love / Hate Score": "-0,1",
        "Love / Hate Score (Lay)": "Medium Low",
        "Possibility of Change (RMSE)": "0,1081645492",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,138",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,1",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pbm",
        "Point Name":
          "Exclusion tactics that limit access to certain medications such as AbbVie or Amgen.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Well, that is what it's been. I don't know how AbbVie is going to respond to that. But I guess my point is that in the event that you're taking AbbVie and you're excluding those products and you're upset, you're disrupting all that business, you're disrupting not only Humira, but also Skyrizi and Rinvoq, every single manufacturer that continues to be preferred will step up money for that. They're going to increase their rebates for that because there is a lot of utilization that's up for grabs. And so, therefore it's not just limited to a portfolio like for Amgen to come in and satisfy that. I would that the PDMs are going to go to every manufacturer and say, what's my number if I exclude AbbVie?",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,1666667",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,415584",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1081645492",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,138",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,142857",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,272727",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pbm",
        "Point Name":
          "State laws on switching to biosimilars make it complicated and pose risks.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Unfortunately it's not exactly clear cut picture in terms of switching. It's not like generic, that basically you can switch easy and really no restrictions anymore for that. Switching as one, as I say, directly generic. Interchangeable biosimilar products, I think is more complicated. I'm not sure about different state laws on that switch. And some state laws might prohibit it or create some other barriers to the switching. And so it's not exactly a 100 percent switch to biosimilar product, at least for the strengths and formulations that is available, but in any event, numerically, you know that market share would be higher for biosimilar product if it gets preferred designation, if it's an interchangeable product. Actually I could estimate-",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,333333",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1081645492",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,138",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,222222",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,111111",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pbm",
        "Point Name":
          "PBMS find it painful to manage differences in WAC v. discount pricing all the while maintaining a preferred drug list.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Right? Because it just makes the decision-making even harder. I don't know that anybody picked the low WACC version because you would take a massive hit from the rebate without understanding whether that would translate into better discounts at the point of sale. I mean, the question just is, say you make $30 million in rebates on Humira. And Humira comes out with a high WACC and a low WACC, and we said, \"We're taking a low WACC. We're getting out of the rebate business,\" well, are the claims going to save you at least 30 million or more for all the disruptions? And if I don't control the pricing and that pricing has to fit into a broader guarantee, well, it makes it much more complicated.",
        "Step of Journey": "SP Confirms Benefits With Payer Plan",
        "Sentiment (Value)": "-0,05",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,400731",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1081645492",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,138",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,18028",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,187118",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0,033333",
        "Love  / Digust Value (Lay)": "High",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs find it painful to imagine what disruption tactics Amgen or HUMIRA will use to shake up preferred drug lists, seeking a swap with an entanercept with an adalimumab, etc.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "And the reason I'm thinking, you can make the case for all three scenarios, of course, but I think this scenario is probably more plausible in my opinion, because it's very difficult to get rid of Humira. Humira has huge market share it is number one product in terms of spend, it's also part of bundle contract with Rinvoq and Skyrizi and basically it would be very difficult to unbundle that contract, even though Humira is a main leader there, but it would be difficult to do. It tough. And it's also tough to keep Humira untouched as the only product covered because for Remicade, for J&J it was easier. There were only two products for a long time, and that was the beginning of biosimilars back then, I think biosimilar companies didn't realize that they have to compete much more aggressively to get coverage with a branded product.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "-0,061904",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,33289",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1081645492",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,138",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,09826",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,23463",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs fear strategies that will include the bundling of a humira biosimilar product with other products and how that may affect formularies; reduce options; force unwanted treatments.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Well, if you follow the pattern with Remicade, I think I'm allowed to say this, I mean, J&J lowered their price a lot. So for a couple of years, we were J&J, and we blocked all the biosimilars. And then the market started to change, and there was lots of activity, good and bad. So we started covering parity, and it was more around, how do you cure the optics of covering the biosimilars for docs and patients that want them but also have the brand available? I don't know that we're going to ever repeat that strategy again. So my guess is option two. So my guess is, how do you get the most out of AbbVie, knowing AbbVie doesn't want any generic competition? However, they understand the legal aspects and all the market activities. AbbVie may allow item two, and no penalty to AbbVie, right, so no penalty to me. So they will max discount Humira. We will let you have one token biosimilar on your formulary.",
        "Step of Journey": "SP Confirms Benefits With Payer Plan",
        "Sentiment (Value)": "-0,0625",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,522719",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1081645492",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,138",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,247159",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,27556",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs fear MAC (max allowable cost) pricing schemes that will reduce HUMIRA biosimilars’ value in the market, making it comparable to generic specialty cancer drugs.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Well, I mean, I think you have to look at the totality of the process, right? I mean, we are going to have a Medicare formulary submitted in May, June, right? And then our commercial shortly thereafter, really finalizing by end of summer. We need to have some visibility into what we're going to have. And just given the timing, that's barrier number one. We keep talking about whether this is a '23 event or a '24 event. We also have to be very careful, that I'm sure AbbVie is having those same conversations, so if we do take a brand for generic strategy and make it a '24 event, will AbbVie feel threatened enough to go max discount? They're looking at the same thing looking at. And so we can't start our... I mean, we could knock adalimumab off of our Medicare formulary for one-one, and then add something back at the last minute based on what we know. But for the most part, we keep looking at this and say, \"You won't get the max price until you have enough manufacturers that come to the table.\" And that's the way we're looking at it right now.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "-0,0833333",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,325968",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1081645492",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,138",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,214857",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,111111",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pbm",
        "Point Name":
          "Painful to force changes when the biosimilar is considered interchangeable because it means they need to do it when the refill window opens, rather than giving a 90 day notice to the patient; context here is that if rebates expire for the current med, the refill window may be further out than 90 days, meaning losses for pharmacies.",
        "Theme Score by Point 1": "Access",
        Quote:
          "So I don't know if all of these are going to have all of the indications or not. Again, that doesn't necessarily matter because from a payer perspective I don't know why something would be biosimilar for Crohn's disease and not for RA. So we're just going to pick one. But the interchangeability thing is also... it's a nice to have, it's not worth a premium because all that means is... Because I have to move these patients anyway, if I go to a biosimilar, right. Because I can't have half my market sitting on the brand when I'm not getting a rebate on the brand anymore. I've just shot myself in the foot and doubled my cost overnight. So I'm going to have to force switching. And so all the interchangeability means is it's going to take a quarter longer to do it. If it's interchangeable, you can do it upon refill. If it's not, you just have to give somebody 90 days notice to get a new prescription and get on the biosimilar. So that's why it's 8%.",
        "Step of Journey": "SP Confirms Benefits With Payer Plan",
        "Sentiment (Value)": "-0,1",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,3333334",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1081645492",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,138",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,1666667",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,1666667",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pbm",
        "Point Name":
          "Lack of pricing transparency and realized savings to health plans.",
        "Theme Score by Point 1": "Access",
        Quote:
          "I think there's enough data out there on switching across the globe that people have moved on. I mean, I always say this, and I humor myself, right? Back in the day, we said that clinical and interchangeability were the two biggest barriers to biosimilar adoption. I mean, I go back to presentations I did in 2013, none of them matter. Today, it's price. People can't understand the price. Interchangeable, they don't care as much. Clinical, nobody has an issue. I think, again, biosimilar to biosimilar and changing every year is still an open item, but it's been the lack of pricing transparency and realizing savings for both patients and health plans that have held everything back.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "-0,14286",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,4",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1081645492",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,138",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,1",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,3",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs fear any drastic measures AbbVie may take whenever they try to add a biosimilar onto the formulary, in terms of financial rebating programs, price reduction, etc.",
        "Theme Score by Point 1": "Access",
        Quote:
          "I mean, to lose all your Humira rebates and grandfather will never save any money at all. It will cost ourselves millions. Right? I mean, think about it. If you grandfather all the Humira patients and AbbVie says, \"Well, you're not covering me anymore, no rebates left there,\" by the time we get enough share of the biosimilar, I'll be 90 years old. I mean, it's not going to happen. And we didn't grandfather any of the cancer stuff either. So I don't see a need to grandfather.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "-0,1875",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,36111",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1081645492",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,138",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,138888",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,222222",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pbm",
        "Point Name": "Changes to rebate guarantees as retaliation.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Yeah, no it's... We work with the rebate aggregator and they say that there's actually a chance that one of these biosimilars could come out next year, in 2022 before 2023. But as it stands right now, we have the AbbVie deal, so it's like AbbVie's deal to lose. Even though there's all these biosimilars coming to market, we expect AbbVie to be very aggressive with their rebates. So one of the factors that comes in here is also rebate guarantees that we have as a PBM. So I'm sure you're familiar with rebate guarantees basically-",
        "Step of Journey": "SP Confirms Benefits With Payer Plan",
        "Sentiment (Value)": "-0,188888",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,425924",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1081645492",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,138",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,23148",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,194444",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pbm",
        "Point Name":
          "Co-insurance and deductible schemes forcing PBMs to pay more out of pocket.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Well, so what I was going to say is in the old days you could do a brand for gene. So a PBM could very easily cover a higher WAC Humira with the big rebate. And they would have an incentive to do that because they reach to a portion of the rebate, obviously. Right. But now it's becoming harder to do because of all the co-insurance and deductibles. And so a member's out of pockets based off of the WAC. And so you get in trouble pretty quickly when you're forcing them to pay more money out of pocket when your argument is, \"Well, I get all this money on the back end.\" So politically it's becoming harder to do, but there will be some PBMs to maybe try that if AbbVie offers a big rebate. But like I've said, I think that's becoming harder and harder to do, so most, even most people, even PBMs will probably end up having to go to a couple biosimilars.",
        "Step of Journey": "SP Confirms Benefits With Payer Plan",
        "Sentiment (Value)": "-0,222222",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,3666667",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1081645492",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,138",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,1666667",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,2",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pbm",
        "Point Name":
          "PBMs fear situations where a patient couple is on different medications as a result of insurance approvals –e.g. father is on HUMIRA for Crohn’s, mother is on biosimilar for RA; if pharmacy cannot accommodate, they’ll lose both rather than one.",
        "Theme Score by Point 1": "Access",
        Quote:
          "It's almost like... I know it's based on conditions. Granted it's got to be different docs you got to talk to. But that just sounds harder to explain. I'm using my mother principle, at this point. Like she has already... My dad... They don't... I'm just using this example. She has RA and my dad has Crohn's. Why aren't they both on the same product, whenever they used to be on the same product, before? That's a tough one to explain. And, granted, it comes down to FDA and things like that. It just sounds a little harder. And then, also, you got to have both of them play nice in the sandbox together to probably... Because I view that as like, you're excluding HUMIRA. We need that big rebate to make up for the difference, and to go through that pain, and knowing that's not going to be a hundred percent. Unless they already had some agreement on the back end, I don't know about, it seems like I need to bring two people together to get them to agree. ",
        "Step of Journey": "SP Confirms Benefits With Payer Plan",
        "Sentiment (Value)": "-0,333333",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,454545",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1081645492",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,138",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,363636",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,090909",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pm",
        "Point Name":
          "PMs love when providers respond directly to patients when they have questions about HUMIRA.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Yes. Yeah. Theyit. It's not...\" And after the doctor reassured her, she was fine after that, but yeah, that's so funny, you asked that, because we had a lot of different comments going around about it.",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "0,6666667",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,666666",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09620407133",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2816666667",
        "Influence (Lay)": "High",
        "Trust / Fear Value (verbatim count mean)": "0,333333",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pm",
        "Point Name":
          "PMs love saving the practice money with inexpensive treatment options.",
        "Theme Score by Point 1": "Access",
        Quote:
          "I pick the one that gives us a better profit margin. For the Humiras of the world though, that's not buying bill, so there's no ... She's not going to know anything about, it's not going to financiallybecause a lot of times they're cheaper.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,66666667",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,6666663",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09620407133",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2816666667",
        "Influence (Lay)": "High",
        "Trust / Fear Value (verbatim count mean)": "0,3333333",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pm",
        "Point Name":
          "PMs love in-person engagements with pharmaceutical reps and the educational benefits of their visits.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "I think you covered it well. As a practice manager, I'm really going to be relying on the reps a lot. I really want to see them. We'regoing to need help to be really educated. So, I know for me, I rely on them coming in and speaking with me and my physicians to really help us through this. So, I hope that that's going to happen.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,633333333",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,854166667",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09620407133",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2816666667",
        "Influence (Lay)": "High",
        "Trust / Fear Value (verbatim count mean)": "0,5625",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,291666667",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pm",
        "Point Name":
          "PMs love being able to access benefits investigation reports from specialty pharmacy practices.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Well, that's a good question, because we won't know until we run the benefit, right? So, if we do get something back andthink that we would definitely always consider if the patient had a huge out-of-pocket.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0,611111111",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,722222222",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09620407133",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2816666667",
        "Influence (Lay)": "High",
        "Trust / Fear Value (verbatim count mean)": "0,444444444",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,277777778",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pm",
        "Point Name":
          "PMs love starter packs to help patients get through authorization process.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "And they were like, \"Oh man, it was really working for me.\" So that's not good. So if you have starter packs, they're great. The patients love to get started yesterday. And they really like that, but there needs to be something in place after the fact forit got denied the first time. Now we need to write an appeal. Well, the appeal got denied, then you're got to do another level of appeal. So that takes time. And sometimes it can take six, eight weeks, if somebody's getting nitty gritty about an approval before something gets resolved and you don't want your patient not being on anything. So that's where the starter packs are great. ",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0,5714286",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,75",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09620407133",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2816666667",
        "Influence (Lay)": "High",
        "Trust / Fear Value (verbatim count mean)": "0",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,625",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0,125",
        "Love  / Digust Value (Lay)": "High",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pm",
        "Point Name":
          "Pms love knowing preferred treatment tiers according to pharma manufacturers.",
        "Theme Score by Point 1": "Access",
        Quote:
          "But I do think that it would be helpful to know from the drug manufacturers, that if this is an Anthem patient, we're preferred. Or even if it's we're tier one, tier two, tier three, I can read between those lines. I know I've seen it. I want to say with Taltz, I had something like that. I could look and say, \"Okay, well, if you'retier one, clearly I'm not going to have to jump through too many to get this for a patient.\" That would be super helpful. I think one prior authorization form across the board is something that they work on in some states. ",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,5",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,8571428",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09620407133",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2816666667",
        "Influence (Lay)": "High",
        "Trust / Fear Value (verbatim count mean)": "0,4285714",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,4285714",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pm",
        "Point Name":
          "PMs love informing patients about how HUMIRA will impact their health prior to assignment.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "It gets to be a little cumbersome, physically speaking, but I think it's good for the patients to have sometimes. Because the provider will come out and say, \"Hey, what do you have for Humira?\" or for whatever, for patients who are psoriatic, who are rheumatoid. I think it's helpful, again, to help reinforce that this is what's happening to you. This is what we think is going on with you,study it.",
        "Step of Journey": "Paperwork Submitted",
        "Sentiment (Value)": "0,5",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,833333",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09620407133",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2816666667",
        "Influence (Lay)": "High",
        "Trust / Fear Value (verbatim count mean)": "0,5",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pm",
        "Point Name":
          "PMs love having one place (online portal) to submit their authorization forms, additional details.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "I just, I don't know. I tried, but if it was one portal for all drugs, that would be one thing, but to go in for my Humira patients here,script to some of these pharmacies and I get an answer back faster, as far as, yes, it's covered and just needs a PA, or no, it's not covered, use something else. I just think it's faster. ",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0,5",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,666666",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09620407133",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2816666667",
        "Influence (Lay)": "High",
        "Trust / Fear Value (verbatim count mean)": "0,333333",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pm",
        "Point Name": "PMs love strong partnerships with specialty pharmacies.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "No, we would decide. So we tell them what to check. So we'll send them the patient name insurance stuff, and we'll say, run with Humira, run with this. We don't give them ... Just pick a random one, we tell them exactly what to run with.",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0,5",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,666666",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09620407133",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2816666667",
        "Influence (Lay)": "High",
        "Trust / Fear Value (verbatim count mean)": "0,333333",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pm",
        "Point Name":
          "PMs love knowing how to navigate authorization processes with HUMIRA (20+ years experience).",
        "Theme Score by Point 1": "Access",
        Quote:
          "I envision it, but I think it's going to take some time. We develop our trends and all of that by over time, you know what I mean? So, we can see everything that Blue Cross wants or normally UnitedHealthcare wants this, but because there's so new, it's going to take us some time to kind of develop a trend of like we are now with Humira.We've been using it so long, we know exactly probably with almost every insurance company what's kind of going to happen or what steps we'd have to take to get the patient approved, but with the biosimilars, I don't know. I just think it would take some time for us to see how that's going to pan out.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0,42",
        "Sentiment (Lay)": "Medium High",
        "Love / Hate Score": "0,555",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,09620407133",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2816666667",
        "Influence (Lay)": "High",
        "Trust / Fear Value (verbatim count mean)": "0,273333333",
        "Trust / Fear Value (Lay)": "Medium",
        "Joy / Anger Value (verbatim count mean)": "0,281666667",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pm",
        "Point Name":
          "PMs love have resources that let them share info with / train other offices to help them navigate authorization process more easily.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "I do, I noticed that it's been a huge issue so that's something that I just been really passionate about is training other offices to help them understand you know what.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,8",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09620407133",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2816666667",
        "Influence (Lay)": "High",
        "Trust / Fear Value (verbatim count mean)": "0,2",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,4",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0,2",
        "Love  / Digust Value (Lay)": "High",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pm",
        "Point Name": "PMs love when the providers' decisions are clear.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "How these drugs work, so they should be able to make the decision executive decision to say, this is what you should be on this is what I feel like is a great fit for you.",
        "Step of Journey": "Practice Manager Processes Script with SP",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,666666",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09620407133",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2816666667",
        "Influence (Lay)": "High",
        "Trust / Fear Value (verbatim count mean)": "0,333333",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pm",
        "Point Name":
          "PMs love when they can know earlier in the process if a patient will be denied treatment.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Of course, but uh you know so it's Nice because, with that it can kind of be proactive versus reactive, and you know that's that's The goal is to try to get as proactive as possible, so I can reject the benefits just with the click a button for all the patients.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,555555",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,09620407133",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2816666667",
        "Influence (Lay)": "High",
        "Trust / Fear Value (verbatim count mean)": "0,333333",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,222222",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pm",
        "Point Name":
          "PMs love when the script is comprehensive and includes specific information (history of drug failures, etc.) that will help in the authorization process.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "I think, to minimize their work, thank you for giving me the idea, I'm going to have to just have them writethe script will be accepted, because I also run the risk of needing to be more specific in the script, which means that I have to go back, ask for another script. It's a lot of time that the doctors don't have. ",
        "Step of Journey": "Practice Manager Processes Script with SP",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,5",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,09620407133",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2816666667",
        "Influence (Lay)": "High",
        "Trust / Fear Value (verbatim count mean)": "0,25",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,25",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pm",
        "Point Name":
          "PMs love when patients can get started on treatment immediately.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "And they're miserable and you know we're giving them this medications because we know they work, so you know why not get them access to it quickly and make sure that it's affordable for them, and so that they can stay on therapy and enjoy their life, you know.",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,5",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,09620407133",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2816666667",
        "Influence (Lay)": "High",
        "Trust / Fear Value (verbatim count mean)": "0,25",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,25",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pm",
        "Point Name": "PMs love in-person patient support programs.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Or the injection process, but if they have questions about the actual you know drug itself or any side effects or anything like that, and they obviously they will need to call the office and schedule a follow up but i'm in a in a perfect world, that would be that would be amazing.",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,4999997",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,09620407133",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2816666667",
        "Influence (Lay)": "High",
        "Trust / Fear Value (verbatim count mean)": "0,1666667",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pm",
        "Point Name":
          "PMs love when information between the pharmacy and practice is transparent and detailed (connected via EMR).",
        "Theme Score by Point 1": "Experience",
        Quote:
          "It has solved a lot of it. So, they know that if we... They're asking for records, they need to know a patient tried and failed this or whatever. They'll tell us that we're sending additional information and the reason we're sending it, but they can extract thatinformation on their own. We don't have to upload it or fax it or wait to get confirmation back that they got it. They keep us abreast of every step and everything that they're doing, but it's kind of taken like a lot of the burden out of our hands to wonder where we are in the process, \"Oh, we have to send over notes. Oh, we need lab work. We need this sent over.\" So, that has helped our office tremendously.",
        "Step of Journey": "Practice Manager Processes Script with SP",
        "Sentiment (Value)": "0,317460317",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,483760684",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,09620407133",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2816666667",
        "Influence (Lay)": "High",
        "Trust / Fear Value (verbatim count mean)": "0,254700855",
        "Trust / Fear Value (Lay)": "Medium",
        "Joy / Anger Value (verbatim count mean)": "0,229059829",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "pm",
        "Point Name":
          "PMs love when it's clear that the patient / provider truly wants a specific treatment.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "To be honest with you, the ones that we don't have to fight, we don't. We're like out of fight with it. So, if the patient just... We just tell them, \"Look, your insurance is saying, you have to do this drug now.\" And we know that we can buy it, we can administer it, we just do it, but like I said, there aresome cases where the patient is just adamant, they're like, \"I don't want biosimilar.\" And those we will fight, we'll try to fight for the patients so that they can stay on the therapy that they've been on.",
        "Step of Journey": "Practice Manager Processes Script with SP",
        "Sentiment (Value)": "0,25",
        "Sentiment (Lay)": "Medium Low",
        "Love / Hate Score": "0,4",
        "Love / Hate Score (Lay)": "Medium Low",
        "Possibility of Change (RMSE)": "0,09620407133",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2816666667",
        "Influence (Lay)": "High",
        "Trust / Fear Value (verbatim count mean)": "0,2",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,2",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pm",
        "Point Name":
          "Pharmacies that don’t share an EMR require PMs to do more work gathering medical notes, labs, etc. to submit if authorization process requires more information.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "It has solved a lot of it. So, they know that if we... They're asking for records, they need to know a patient tried and failed this or whatever. They'll tell us that we're sending additional information and the reason we're sending it, but they can extract thatinformation on their own. We don't have to upload it or fax it or wait to get confirmation back that they got it. They keep us abreast of every step and everything that they're doing, but it's kind of taken like a lot of the burden out of our hands to wonder where we are in the process, \"Oh, we have to send over notes. Oh, we need lab work. We need this sent over.\" So, that has helped our office tremendously.",
        "Step of Journey": "SP Confirms Benefits With Payer Plan",
        "Sentiment (Value)": "0,166667",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,3076924",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1188260833",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,1523333333",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,1538462",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,1538462",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pm",
        "Point Name":
          "PMs find it painful that providers are needing to start their approach with a traditional DMARD therapy because they know insurance companies may not approve HUMIRA if other measures have not been taken prior; needless hurdle and prolongs actual care.",
        "Theme Score by Point 1": "Access",
        Quote:
          "I have to say, for the most part, doctors will start with a traditional DMARD, mostly because that's what the insurance company will want to see.at failure after that, or somewhere a couple months down the road, unless it's very, very clear, you've been suffering this forever and you've already done something or there's nothing else we can do. But we're very traditional, I think.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,1666667",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,3076924",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1188260833",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,1523333333",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,1538462",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,1538462",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pm",
        "Point Name":
          "Three month authorization period from insurance companies for new starts on HUMIRA therapy approvals.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "In the beginning, it seems like the insurance companies only are doing a three month authorization period. And then after that three month period, then they will make them longer many times it's a year, we'll get a year's approval. But it seems like more and more for the initialauthorization for new starts, they only give it three month authorization, which irritates us. But we don't have any control over that.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,25",
        "Love / Hate Score (Lay)": "Medium Low",
        "Possibility of Change (RMSE)": "0,1188260833",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,1523333333",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,25",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pm",
        "Point Name":
          "Handling authorizations, copay assistance or patient assistance tasks; using different prescription authorization forms (per therapy) to submit to insurance companies is a burden.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "If you have a commercial insurance or, if you have coverage and technically they have coverage it's just the insurance company is not accepting anything to go towards their deductible, and they won't use their copay card to help them pay for it, you know it's just it's wrong.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,347222",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1188260833",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,1523333333",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,111111",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,236111",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pm",
        "Point Name":
          "Too many forms to complete for authorizations, appeals, etc.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "It's my understanding that Massachusetts has a form that all drugs, across the board, all insurance companies, allproducts have to use the same form would be helpful, because I find that I'm using a different form for every company. Then, for every med, there's a different one, or even more than just this class. It's a little bit too much.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,5",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1188260833",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,1523333333",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,25",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,25",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pm",
        "Point Name":
          "PMs find it painful managing the patient’s response once they receive a denial letter from the insurance company about their HUMIRA.",
        "Theme Score by Point 1": "Access",
        Quote:
          "The insurance company sends them denial letter and then it sounds kind of scary, I think, from the patient, so the patient perspective they're like.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "-0,16666665",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,45",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1188260833",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,1523333333",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,225",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,225",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pm",
        "Point Name":
          "Lack of patient training on preparedness for life on HUMIRA.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "First choice would probably be, if Humira's there, it's what we know and that's what we would use. I will say now that I sayif it wasn't a significant difference for the patient financially, or a burden, if you will, to the patient, I think it's fine to stick with what we know. If it gets to the point where there isn't that support we would probably have to do with whatever would be more financially appropriate for the patient. ",
        "Step of Journey": "SP Ships Medicine to Patient",
        "Sentiment (Value)": "-0,16666665",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,5",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1188260833",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,1523333333",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,2",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,3",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pm",
        "Point Name":
          "PMs feel anger towards insurance companies’ power in deciding medical treatment without have a medical background. Perspective is that medicine is decided on financial decisions and not health-related.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Yeah, the only pain in the rear as far as patient access is the stupid insurance companies. That's what inhibits access to drugs, unfortunately.a lot of offices won't spend the time to do that. ",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "-0,219047614",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,305782316",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1188260833",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,1523333333",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,117006803",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,188775513",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pm",
        "Point Name":
          "PMs find denials painful due to the required work that follows, but they find it especially painful when there’s a gap in time between when they can communicate the denial to the patient / provider.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "They don't want to spend a lot of time talking to insurances and doctors and trying to tell them what they think is best for the patient, but unfortunately, we have to sometimes. So, our first instinct always, it's very frustrating, because we do all the work to get the prior authorization, only to get the paperwork back saying, \"Yeah, no,patient has to try this drug.\" \"Well, we don't have that drug. We've been buying this Remicade or whatever. We don't have that drug.\" So, now we've had to go through buying a lot of biosimilars that we never used to even keep on hand in the office. So, we were trying to hold off as long as we could trying to fight it, but we lost. We're buying biosimilars now.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "-0,333333",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,666667",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1188260833",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,1523333333",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,666667",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "pm",
        "Point Name":
          "PMs find it painful to communicate to the providers what the process is for switching patients from one therapy to HUMIRA or to another therapy from HUMIRA.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "And well, that's non-medical switching and we don't play that game. So we fight it and win our battles. Butthe insurance companies have gotten way too much power. And they're the ones honestly, that decide what medications the patients can have. It's been taken out of the hands of the doctors. We can put in a request saying pretty, please, mother, may I? And they'll say, \"Yes, you can.\" Or they'll say, \"Sorry we're not going to do that.\"",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "-0,4",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,333333",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,1188260833",
        "Possibility of Change (Lay)": "Medium High",
        "Influence (R^2)": "0,1523333333",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,222222",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,111111",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-rheum",
        "Point Name": "Providers love sticking with what they know will work.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Well, I'll pick the bio-originator. Why wouldn't I? Because that's the one I had the most experience with. Again, theyall... They may differ by an amino acid here or there, but they're different molecules still. I'll stick with the bio-originator unless I have some enticement or whether that's a cost reduction for the patient, or branded HUMIRA is not on the first tier, or there's some unique reason for me to recommend the biosimilar. If all things are being equal, of course I'm going to stick with HUMIRA.",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "0,666667",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,666666",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,333333",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "provider-rheum",
        "Point Name":
          "Lack of support or assistance programs for elderly population that needs HUMIRA treatment.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "And also, it's not just Medicare, Medicaid, commercial insurances. There's so many assistance programs.There's Epic, there's manufacturer assistance. So somebody who is an expert at it and knows how to manage through and also support the patients in this process, especially the elderly patients. I don't know how... It's difficult for them to understand all the different parts that need to be there so their $5,000 monthly biologic can be affordable to them.",
        "Step of Journey": "SP Ships Medicine to Patient",
        "Sentiment (Value)": "0,666666",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "-0,33927",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,06955267154",
        "Possibility of Change (Lay)": "Low",
        "Influence (R^2)": "0,09566666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,14285",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,07142",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0,125",
        "Love  / Digust Value (Lay)": "High",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-rheum",
        "Point Name":
          'Providers love bridge programs to help patients who are "in between insurances" or in other situations remain on the treatment.',
        "Theme Score by Point 1": "Experience",
        Quote:
          "Well, it's good. Some of the products that have a bridge program, it's worked out okay even though it's a finite amount of time that they can support the patient, but we do have numerous issues or patients between insurance or things like that, where it comes into play and they're able to keep the patient on drug, sometimes they'll extend it beyondthe predetermined timeframe that they say they can cover the patient. So I think they are very useful and helpful. So it'd be nice if they had that for sure.",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "0,6",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,857142",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,428571",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,428571",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi, provider-rheum",
        "Point Name": "Providers love efficacious treatments.",
        "Theme Score by Point 1": "Product",
        Quote:
          "Efficacy, so how much they feel better, how it's helping. And number two, ease of use, side effects, if they feel like it's tolerated,if they are tolerating it well, no injection site issues. And is it efficacious? Then that would go up in my mind as, that's something I might use again in another patient.",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "0,588888889",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,744047619",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,44047619",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,303571429",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi",
        "Point Name":
          "Providers love working with phamarcies they can communicate with via their EMR.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Oh, yeah. Most definitely. I think that a patient portal from the drug company can easily cover the benefits of the SP just by working through some of the financial screening. The only advantage we sometimes have, at various intervals, we will have a relationship with a SP that has access to the charts, andthey'll review the chart for any missing data. So, they'll keep you up to date if you've got your TB testing done, or this person needs a Hematic B test done. So, sometimes the pharmacist will help. If they have access to records, they can make sure those things are done.",
        "Step of Journey": "Practice Manager Processes Script with SP",
        "Sentiment (Value)": "0,583333333",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,788888889",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,322222222",
        "Trust / Fear Value (Lay)": "Medium",
        "Joy / Anger Value (verbatim count mean)": "0,466666667",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-rheum",
        "Point Name": "Providers love inexpensive treatments.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "So it's a mixed experience. Some patients are really opposed to the idea of switching, and some patients are okay. I think that in my mind, I have not seen any difference, clinical difference, with the infliximab biosimilars versus branded Remicade. I think that the infliximab biosimilars work just as good as Remicade does.has dropped the price after a while as well. So the Remicade costs also have gone down when they were competing with the infliximab biosimilars. So that's why I stuck with Remicade, because it was giving us lots of benefits. But now we have to switch, and then clinically I have not seen any difference. They work just as good as branded Remicade does.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0,5",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,857142",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,428571",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,428571",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi",
        "Point Name": "Samples to help patients switch; not get started.",
        "Theme Score by Point 1": "Product",
        Quote:
          "I've rarely done a new start with the samples. It's usually the samples are when insurance has changed and there's some delay in getting the drug for the patient, or if thepatient has lost insurance. The hospital has a patient assistance program. The charity care tries to get patients on Medicaid and such to help them out. To kind of bridge that gap, that's where we use the in-house supplies or stock.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,5",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,833333",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,5",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-rheum",
        "Point Name":
          "Providers love when they have medical data they can use to support their decision for HUMIRA.",
        "Theme Score by Point 1": "Product",
        Quote:
          "So for Humira, it's typically very quick. Because what I do is if it's denied,it's either, yeah, one of those logistics that they're missing something, which is still quick. We'll immediately send them a TB report or we'll immediately send like, \"Okay. This patient has liver cirrhosis. Can't take methotrexate,\" something like that, one line and they're good to go.",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "0,5",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,8",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,6",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,2",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-rheum",
        "Point Name": "Providers love the HUMIRA ambassador patient program.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Yeah. I complained about at the samples, but they are actually very good with everything else. They have the ambassador program and they enroll the patient. They follow up with the patient frequently to help them navigate the process. So I still think they're doing a good job overall. But most of our patients are able to get on the drug and get it as there's very few thatslip through the cracks. It's just you got to follow up and make sure that it happens.",
        "Step of Journey": "Practice Manager Processes Script with SP",
        "Sentiment (Value)": "0,5",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,75",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,375",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,375",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi, provider-rheum, provider-derm",
        "Point Name": "Medicines are reliably available.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Okay. A good question there. Number one is, the only time I would think about switching is, which I think it's closely interchangeable to adalimumab.That's number one. Number two is, obviously with the availability, obviously with the insurance and everything is giving you a hard time for us to continue with HUMIRA. Then we may have to consider the closest possibly to interchange into your biosimilar. That's the only option we have at that point.",
        "Step of Journey": "SP Ships Medicine to Patient",
        "Sentiment (Value)": "0,5",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,75",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,375",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,375",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi",
        "Point Name":
          "Providers love having a strong relationship with the pharmacy so as to ensure they respect the provider's treatment decision.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "And so, if that's the case, then that would be the most likely strategy for the specialty pharmacy to do. But if not, if they say, \"Hey, look, this insurance said you could use any generic,\" in thatscenario, what I'd do is I see which one is ... Because I don't think that all of them will be approved right away. So which one is available at that time that we can get the fastest?",
        "Step of Journey": "SP Ships Medicine to Patient",
        "Sentiment (Value)": "0,5",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,666666",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,333333",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-rheum",
        "Point Name":
          "Providers love knowing they don't have to worry about treatment supply from the manufacturer.",
        "Theme Score by Point 1": "Access",
        Quote:
          "So then as a year comes aroundand the manufacturer can no longer provide them the supply, then you have to go back to the health plan and find out what's on their formulary to get the patient coverage. So, I don't know that that would be very helpful.",
        "Step of Journey": "SP Ships Medicine to Patient",
        "Sentiment (Value)": "0,5",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,666666",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,333333",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "provider-gi, provider-rheum",
        "Point Name":
          "Providers find it painful that there isn’t flexibility in how they and their patients adjust to HUMIRA, in terms of dosage and variation in injection schedule.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Well, I don't think it's a must have, but I think we've gotten used to it. And so that's something that we would probably expect going forward and it's part of the patient experience and they're very happy with the newer formulation. So I think as far aslike a biosimilar that is looking to develop this product, it would behoove them to be citrate free so it's similar to... Especially if there's going to be forced switches from insurance, they're not going to like it if a patient has to go from the citrate free high concentration to the old formulation, they would be very upset. I could see a lot of patients being very upset about that.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,5",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "-0,4",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,06955267154",
        "Possibility of Change (Lay)": "Low",
        "Influence (R^2)": "0,09566666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,2",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,2",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi",
        "Point Name":
          "Providers prefer not having to mention a treatment's brand name to patients.",
        "Theme Score by Point 1": "Product",
        Quote:
          "I mean the GI societies are higher levelto do that. I would say that when it comes from the biosimilars company, if there's a brochure, and the link it's sometimes less effective because obviously we say, \"Well, that's the company that produces it so... \" I mean from a patient standpoint, so I do think it needs to come from a more... society. ",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "0,466666667",
        "Sentiment (Lay)": "High",
        "Love / Hate Score": "0,749999667",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,333333",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,416666667",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi, provider-rheum",
        "Point Name":
          "Train patients on how to inject HUMIRA; do the first one with them.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Almost always. We have definitely seen a downtick in the availability of samples and I think that's intentional on AbbVie's side because they want to sway us towards their newer products since we are going to get biosimilars soon, but it's been more difficult. But in general, withall of our biologics, we like to start it in office and do the first one with them and do the teaching. And we've found that's really improved compliance because it can be very daunting. And if you do the first one with them and say, \"Hey, this isn't a big deal,\" and they get less scared and you ensure the proper follow up that they continue on the drug when they get it through the specialty pharmacy.",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "0,444444444",
        "Sentiment (Lay)": "Medium High",
        "Love / Hate Score": "0,65",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,433333333",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,216666667",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-rheum",
        "Point Name":
          "Providers like keeping patients steady on HUMIRA once they acclimate to the treatment.",
        "Theme Score by Point 1": "Product",
        Quote:
          "A patient's stabilized on a given molecule and it's working well, I wouldn't want to changebiosimilar to biosimilar, I don't think I'll ever be amenable to something happening. ",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "0,433333333",
        "Sentiment (Lay)": "Medium High",
        "Love / Hate Score": "0,65",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,366666667",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,283333333",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi, provider-rheum",
        "Point Name":
          "Providers love when they can prepare a patient to move from HUMIRA to a biosimilar rather than switching without any prep.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Again, I'm thinking back, and again I'm extrapolating from our experience with Renflexis: patients who were already on it, most of them I don't think they even ask. It's really the few that are very... I personally call it health consumerism, or more involved in their health, that they're the ones who actually even know. From ourthe Humira, the originator biologic onboard, but I don't see much problem. I think after we dealt with this with infliximab, and with the fact that infliximab is also an infusion, I think that... And we were worried at the beginning that they may have more infusion reactions, etc., but everything overall was fine, so I think that it will go... It should go smoothly, I foresee.",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "0,425",
        "Sentiment (Lay)": "Medium High",
        "Love / Hate Score": "0,64702381",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,267261905",
        "Trust / Fear Value (Lay)": "Medium",
        "Joy / Anger Value (verbatim count mean)": "0,379761905",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi, provider-rheum",
        "Point Name":
          "Providers love engagement with a rep to review clinical studies, and familiarize physicians / office with the company.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "I'm pretty laid back. I don't care how. Either is fine. And, I think I'd say maybe a slight preference for face-to-face, just because it's more personable.",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "0,416666667",
        "Sentiment (Lay)": "Medium High",
        "Love / Hate Score": "0,654761904",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,31547619",
        "Trust / Fear Value (Lay)": "Medium",
        "Joy / Anger Value (verbatim count mean)": "0,339285714",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-rheum",
        "Point Name":
          "Providers love when they can start a patient on a biosimilar as opposed to switching them from HUMIRA.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "The ones that I've seen that happenedwith Remicade, it's just kind of disrupted the doctor patient relationship a little bit. But for new starts, I'm going to be open minded to it. I have not seen a whole lot of problems with currently available biosimilars. And, of course, Europe has a lot more experience and has not really seen much either. So I think that it'll be a huge thing, it's going to probably hit immediately. And I'm sure the contracts are already being written and negotiated at this point.",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "0,416666667",
        "Sentiment (Lay)": "Medium High",
        "Love / Hate Score": "0,55",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,366666667",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,183333333",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi",
        "Point Name": "Treatment is included in the formulary.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Right. Well, that's unusual. Most of them will tell you that it's not the right pharmacy, but all of them will, if it's not the preferred medication, will reply and send emails out and say like, \"This insurance actually prefers Stelara or Xeljanz.\" Or, this pharmacy has another preferred biologic. It doesn't happen that often, butthey would do that as well. They would commit to you if there's a different medication that will be covered better.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0,416666667",
        "Sentiment (Lay)": "Medium High",
        "Love / Hate Score": "0,535714286",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,154761905",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,380952381",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi, provider-rheum, provider-derm",
        "Point Name":
          "Patient support program / education with medical professionals (esp. for age group).",
        "Theme Score by Point 1": "Experience",
        Quote:
          "So if biosimilar four's rep knows that, \"Hey, this area is servicedbeen able to have time to go to conferences or read about the switching studies that have been done in IBD and provide that information and say, \"Look, we're here as a resource. Oh by the way, here's our support too if they have any issues. Would you like some pens in case patients misfire?\" That would be very professional and not in your face and disgusting.",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "0,395833333",
        "Sentiment (Lay)": "Medium High",
        "Love / Hate Score": "0,639999237",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,314373474",
        "Trust / Fear Value (Lay)": "Medium",
        "Joy / Anger Value (verbatim count mean)": "0,325625763",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi",
        "Point Name": "Overnight therapy shipping; avoid storage and spoilage.",
        "Theme Score by Point 1": "Experience",
        Quote:
          'And so, that would be the best way topromise them that, "Hey, guys. Look, we will overnight it to you. So you don\'t have to find a place to store it," because it needs to be in the refrigerator. "Two, you don\'t have to worry about it being expired, because if it stays in your refrigerator and you forget about it, and if it expires, then that\'s waste of medication."',
        "Step of Journey": "SP Ships Medicine to Patient",
        "Sentiment (Value)": "0,375",
        "Sentiment (Lay)": "Medium High",
        "Love / Hate Score": "0,9",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,633333333",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,266666667",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi, provider-rheum",
        "Point Name":
          "Providers love when their patients are not denied the treatment they prescribe.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Again, we're just talking about home administered or injectables. I could make it faster, frankly. I could give patient samples. I don't do that as much as I used to because,frankly, there's so many medicines now and for some of the medicines you just don't know the patient's going to be approved, or it's going to be a formulary agent that's going to be allowed. I don't want to give the patient samples and not know.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0,375",
        "Sentiment (Lay)": "Medium High",
        "Love / Hate Score": "0,571428572",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,328571429",
        "Trust / Fear Value (Lay)": "Medium",
        "Joy / Anger Value (verbatim count mean)": "0,242857143",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi, provider-rheum",
        "Point Name":
          "Saving time by eliminating prior authorization process; or support.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "A very good question. So I've had that relationship with this pharmacy for like six, seven years, because I was previously at an orthopedic practice. So it was orthopedists,pain management, and me, one rheumatologist. So, none of those practices really know how to run a rheumatology practice. So again, we didn't really have a setup for prior authorization, which the quantity of prior authorizations of rheumatologists need to do for their patients is significant.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0,345238095",
        "Sentiment (Lay)": "Medium High",
        "Love / Hate Score": "0,629251701",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,290816327",
        "Trust / Fear Value (Lay)": "Medium",
        "Joy / Anger Value (verbatim count mean)": "0,338435374",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi",
        "Point Name":
          "Providers love when their EMRs have enough data stored to help them make decisions about biosimilars.",
        "Theme Score by Point 1": "Product",
        Quote:
          "Again, when the data started coming out, we were in a way always skeptical. We all know sometimes, even with the formulations themselves, the way it was with of just my default Remicade, I would not. The second we started revamping our electronic medical record, and now we're in a way geared towards the biosimilars, everyone became very comfortable with that. ",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,8",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,4",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,4",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-rheum",
        "Point Name":
          "Providers love having the choice of subcutaneous v. injection, as part of managing patient preferences.",
        "Theme Score by Point 1": "Product",
        Quote:
          "Yeah. So we have some experience with into that decision as well, such as compliance and patient desires and fear of needles and things like that. So there's other reasons why we might pick IV versus subcu, but sometimes it does just kind of boil down to their insurance and which one they cover the best.",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,8",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,4",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,4",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi",
        "Point Name":
          "Providers love when the pre-authorization process is flexible (paperwork v. digital).",
        "Theme Score by Point 1": "Experience",
        Quote:
          "It's like anything, the technology. The younger people are much more in tune with it and they find it easier than some of my older clinic MAs. They still like todo things old school and they'll prefer paperwork, because you can actually fill things out. But a lot of my younger MAs, they prefer doing it digitally.",
        "Step of Journey": "Paperwork Submitted",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,75",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,25",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,5",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi",
        "Point Name":
          "Providers love when patients have time to do labs to help inform the provider about treatment.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "I think that's the biggest hurdle I see, because everything is in place, but then sometimes patients just won't do the labs. The specialty pharmacy and the insurance and all of them are hurdles that are easier to fix versus trying to change the patient mindset or trying to ... Because if you forget to do the labs, there's a good chance that you're not going to do them until you have time, or unless you're really, really sick.",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,75",
        "Love / Hate Score (Lay)": "High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,25",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,5",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi",
        "Point Name":
          "Providers love samples only when they can confirm patients will be approved to continue.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "So that's how I used samples, but I don't typically give samples out for induction. Because I can't necessarily be100% guaranteed that they're going to receive a prior authorization approval for the agent that I seek. And then of course there's logistic concerns with IV infusions with Remicade, et cetera. But I do give samples for other stuff like the budesonide and enemas, and such that can help bridge them over to that time period.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,6",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,4",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,2",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-rheum",
        "Point Name":
          "Providers love when patients have better copay support or pay less.",
        "Theme Score by Point 1": "Access",
        Quote:
          "I mean, that's the feedback I get from patients. Then other stuff I think is pretty standard, the sharps container and all. I think those would be the differentiators. And then of course, good copay cards or in some way where whatever price differences to the healthcare system, some of it is at least going back to the patient, so where they have better copay supports or less copays.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,6",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,2",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,4",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi",
        "Point Name":
          "Providers love giving their patient more of a role in the treatment decision.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "But still for Crohn's disease, for most part, I leave it in the patients hands. Now, the guidelines gently nudgecolitis, then I try to get the patient the IV drug, even if the insurance company denies and says use Humira, but if it's mild to moderate ulcerative colitis, I think it's fair to use or give Humira try.",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,5",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,25",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,25",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi",
        "Point Name":
          "Providers would love better insight into how patients are injecting themselves.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "I would probably say that only for the patients who are alreadynot do that. I don't want them to have at home 80 milligram syringes and 40 milligram syringes, and then I don't exactly know what they gave themselves, etc. I would probably say would be relevant only for patients who are on the already 80 milligram dose as their maintenance. I would say that's the group that I would switch to that group.",
        "Step of Journey": "SP Ships Medicine to Patient",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,333333",
        "Love / Hate Score (Lay)": "Medium Low",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,333333",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "provider-gi",
        "Point Name":
          "Providers fear their more youthful patients may not be able to manage HUMIRA injection pens on their own, so they bring them in for infusion to reduce liability and administrative burden.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "You got to have the discussion with the patient, have a discussion with what they would prefer, their lifestyle. I wouldn't trust young kids and college kids with injections that much. I tend to bring them in for infusion more just out of reliability. People who travel a lot, I probably would prefer to do an injectablefirst just because they're not going to be local enough to do an infusion. Like I said, it's mainly logistical, I would say, and patient preference as opposed to insurance coverage, the limitation.",
        "Step of Journey": "SP Ships Medicine to Patient",
        "Sentiment (Value)": "0,333333",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "-0,4",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,06955267154",
        "Possibility of Change (Lay)": "Low",
        "Influence (R^2)": "0,09566666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,2",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,2",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "provider-gi, provider-rheum",
        "Point Name":
          "Providers find it challenging to imagine switching a patient from HUMIRA to a biosimilar.",
        "Theme Score by Point 1": "Product",
        Quote:
          "If new patients can be easy because we are actually starting on them on the available evidence with biosimilar. Tough portion comes in with transitioning patients who are already on HUMIRA to a biosimilar, that would be a tough one. So rather than we, as aput you on this based on the available line, but easy way, go here, click on this. You'll have an advisory person who is going to talk to you, explain to you, this is what the evidence is and they can provide you all the data. That would be very helpful.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,28095",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "-0,33331",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,06955267154",
        "Possibility of Change (Lay)": "Low",
        "Influence (R^2)": "0,09566666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,11111",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,2222",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-rheum",
        "Point Name":
          "Providers love high concentration treatment options for patients.",
        "Theme Score by Point 1": "Product",
        Quote:
          "Well, I would say I would go with the high concentration. But if there's one with a low concentration, they should have some kind of advantage, maybe cheaper cost, or maybe it is preferable or something like that. So my preference is going to be So I may choose then one of those who may have good experience with biologics in the past.",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "0,266666667",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "0,633333334",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,366666667",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,266666667",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "provider-gi, provider-rheum",
        "Point Name":
          "Whether a pharmacy understands the quantity of prior authorizations a rheumatology practice needs to submit; if they don’t know rheum well, it is very painful.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Who can work on prior authorization. Because we need... It's a one man job, I think. It's hard to get. So right now, I have an LPN nurse and an office assistant, and they run my... In charge of my whole practice. There's nobody else. It's hard for those two people to do prior auth also on top of all the other patient care.",
        "Step of Journey": "Practice Manager Processes Script with SP",
        "Sentiment (Value)": "0,26666",
        "Sentiment (Lay)": "Medium",
        "Love / Hate Score": "-0,309524",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,06955267154",
        "Possibility of Change (Lay)": "Low",
        "Influence (R^2)": "0,09566666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,142857",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,166667",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi",
        "Point Name":
          "Providers would love to see more flexibility with treatment scheduling / regimen cadence.",
        "Theme Score by Point 1": "Product",
        Quote:
          "I think when option is coming up to really provide an added benefit somehow. So if there's a variation on the mechanism that makes it more efficacious or...the medicine you can stop it for a bit and then resume it and not worry about losing effect. They try to advocate for the fact that it's a longer duration between injection every two weeks.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0,25",
        "Sentiment (Lay)": "Medium Low",
        "Love / Hate Score": "0,6",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,4",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,2",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi",
        "Point Name":
          "Providers love when their product choice has a high level of credibility.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Good question. I think that when it's something generic, then patients prefer it because theytrust. The same way that when I read an article and they say it was funded by a pharmaceutical, I'm always more skeptical of the results, compared to something that was investigator initiated, so I think it's the same principle. If there's something from let's say an academic center that says there's a link to even our Crohn's and colitis website of our academic center that says what it is, and then maybe the patients are referred to that, that's also excellent. Usually, again, it's a matter of resources. ",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "0,25",
        "Sentiment (Lay)": "Medium Low",
        "Love / Hate Score": "0,6",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,2",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,4",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-rheum",
        "Point Name":
          "Providers love when it's easy to compare treatments in the EMR.",
        "Theme Score by Point 1": "Product",
        Quote:
          "Well, again, etanercept or Enbrel is pretty well covered by most plans. There are some, though, that it's either not the first... It's usually, if it's not on the first tier you got to try AB and it's on the secondor third level there. A few years ago it was a little more iffy. Enbrel had some issues, but I think they're back in as a preferred agent, but it's not always the first tier. In other words, Humira you might see, for example, Humira, Cimzia, Simponi is the preferred TNF injections that you got to try before they'll let you go to a different mechanism of action, or even perhaps to Enbrel, but Humira is always up there.",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "0,25",
        "Sentiment (Lay)": "Medium Low",
        "Love / Hate Score": "0,6",
        "Love / Hate Score (Lay)": "Medium High",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,2",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,4",
        "Joy  / Anger Value (Lay)": "High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "provider-gi, provider-rheum, provider-derm",
        "Point Name":
          "Anger at insurance companies denying a provider’s recommendation to increase HUMIRA dosage due to a lack of peer reviewed research in the past year.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Yeah. I mean biosimilars, although they're biosimilars, they're not generic, they're also still expensive medications. I don't know, the biosimilars, will they have theirthe patients just because of understaffing, but I'm hoping that's something we can do. And then the patient can... I would like to give them the information so they can directly connect with the manufacturer and take the research... Like Humira and Enbrel have nurses, many of the companies have collecting sharps and getting like travel kits and things like that.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0,25",
        "Sentiment (Lay)": "Medium Low",
        "Love / Hate Score": "-0,25",
        "Love / Hate Score (Lay)": "Medium Low",
        "Possibility of Change (RMSE)": "0,06936300203",
        "Possibility of Change (Lay)": "Low",
        "Influence (R^2)": "0,1953333333",
        "Influence (Lay)": "Medium Low",
        "Trust / Fear Value (verbatim count mean)": "0",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,25",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi, provider-rheum",
        "Point Name":
          "Providers love knowing how to appeal a denial to help their patient get the proper medication.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "It feels good, except for the fact that there's still no complete guarantee that a biosimilar will be approved once you submit it. I've been surprised sometimes that you get denied certain things. But the dirty little secret is that, I think people know this as well, is that once you've been started on a therapy, the continuation of therapy isactual legit thing, and discontinuation of active therapy that works is medical negligence. I've had appeal letters turned around just like that by just virtue of pointing that out to them.",
        "Step of Journey": "Paperwork Submitted",
        "Sentiment (Value)": "0,233333333",
        "Sentiment (Lay)": "Medium Low",
        "Love / Hate Score": "0,568376068",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,313034188",
        "Trust / Fear Value (Lay)": "Medium",
        "Joy / Anger Value (verbatim count mean)": "0,25534188",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi",
        "Point Name":
          "Providers would love to see combination therapies for treatments like HUMIRA (adalumimab).",
        "Theme Score by Point 1": "Product",
        Quote:
          "One thing you guys may know is IBD is becoming more prevalent, we're just going to get more and more of these patients. Whether or not it's because of modernity or stress or both, it's hard to say. It's probably a mixture of everything. But there's not going to be some short supplyof patients for this service. And especially with advanced therapies coming onto the market that are going to be a predominant component of our care and combination based therapies where you have to work with two different companies. I think these sort of services are increasingly important.",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "0,2",
        "Sentiment (Lay)": "Medium Low",
        "Love / Hate Score": "0,571428",
        "Love / Hate Score (Lay)": "Medium",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,428571",
        "Trust / Fear Value (Lay)": "High",
        "Joy / Anger Value (verbatim count mean)": "0,142857",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Love",
        Stakeholder: "provider-gi",
        "Point Name":
          "Providers love having some way of predicting commercial insurances behavior.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Okay. In commercial insurances, some insurances are excellent and in a way that things can go forward very smoothly. But some insurances, even though they're commercial insurances, we do have some difficulties depending on the geographical area. Okay. Overall, I believeI do have less issues, to be honest, actually less issues with the Medicare when compared to some of the commercial insurances I had, actually. Yeah.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0,2",
        "Sentiment (Lay)": "Medium Low",
        "Love / Hate Score": "0,428571",
        "Love / Hate Score (Lay)": "Medium Low",
        "Possibility of Change (RMSE)": "0,09051541683",
        "Possibility of Change (Lay)": "Medium",
        "Influence (R^2)": "0,2726666667",
        "Influence (Lay)": "Medium High",
        "Trust / Fear Value (verbatim count mean)": "0,142857",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,285714",
        "Joy  / Anger Value (Lay)": "Medium",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "provider-rheum",
        "Point Name":
          "Providers find it painful that their treatment choice is also influenced by what insurance will cover best for the patient (incl. switches between HUMIRA formulas); not whether the insurance covers it at all, but more so the extent of the coverage.",
        "Theme Score by Point 1": "Access",
        Quote:
          "Yeah. So we have some experience withinto that decision as well, such as compliance and patient desires and fear of needles and things like that. So there's other reasons why we might pick IV versus subcu, but sometimes it does just kind of boil down to their insurance and which one they cover the best.",
        "Step of Journey": "Coverage Check from Practice Manager",
        "Sentiment (Value)": "0,138095",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,30995",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,06955267154",
        "Possibility of Change (Lay)": "Low",
        "Influence (R^2)": "0,09566666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,17044",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,13402",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0,00549",
        "Love  / Digust Value (Lay)": "Medium Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "provider-gi, provider-rheum",
        "Point Name":
          "Providers find it painful they cannot switch their patients when they fail HUMIRA to another therapy in an efficient manner and have indicated that it can disrupt the provider-patient relationship.",
        "Theme Score by Point 1": "Access",
        Quote:
          "So the Bridge Program is really a work around this because they're like, \"Okay, well, the clinician knows the patient needs this. There's no doubt about it. Payers are maybe going to approve it, maybe not. Let's get them started.\" Then if that appeal letters failed, then you just have to write a letter, and be like, \"Oh,sorry. This patient's already on.\" I actually accidentally did this once for a patient, for a Medicaid patient, and it worked. The insurance company was like, \"Oh, they're on it. Okay, fine. We'll cover it.\"",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "0,13095",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,344",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,06955267154",
        "Possibility of Change (Lay)": "Low",
        "Influence (R^2)": "0,09566666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,15",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,194",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "provider-gi, provider-rheum",
        "Point Name":
          "Providers find it painful when there is a lack of support for patients when they first get started on injection therapy, particularly on whether injections are being done correctly (need assurance) and what the injection and aftermath will feel.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "But, that the benefit of the drug company portal is taking over those benefits and then maybe providing more patient education. For the longesttime, one of the best things that has come out of the support of these drugs is navigation nurses or support nurses, nurses who visit the patients in the beginning of a drug use to see if they're doing their injections well, if they have questions. There's always lots of issues in the beginning, lots of anxiety about injectables primarily, \"What's that going to feel like? Is it going to hurt?\"",
        "Step of Journey": "Patient Receives Treatment",
        "Sentiment (Value)": "0,053333",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,483326",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,06955267154",
        "Possibility of Change (Lay)": "Low",
        "Influence (R^2)": "0,09566666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,26666",
        "Trust / Fear Value (Lay)": "Medium",
        "Joy / Anger Value (verbatim count mean)": "0,216666",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "provider-gi",
        "Point Name":
          "Providers angry at the lack of accountability between pharmacy and insurance companies about the hold-up on delivering HUMIRA to a patient.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Because many will tell me, \"No way. I can't affordthat drug because it's $5,000 a month.\" Then I'll say, for example, \"You have rheumatoid arthritis. It's severe. You will get it somehow. We'll make sure you get it.\" So I'm looking for that support, where somebody's going to be... I can prescribe the drug and have confidence my patients are going to get it and be able to afford it. Because there's so much in between me prescribing it and patients getting the drug.",
        "Step of Journey": "SP Confirms Coverage of Payer Plan",
        "Sentiment (Value)": "0",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,333333",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,06936300203",
        "Possibility of Change (Lay)": "Low",
        "Influence (R^2)": "0,1953333333",
        "Influence (Lay)": "Medium Low",
        "Trust / Fear Value (verbatim count mean)": "0",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,333333",
        "Joy  / Anger Value (Lay)": "Medium High",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "provider-gi",
        "Point Name":
          "When insurance companies deny medicine the patient is already stable on, causing development of antibodies that make the medicine ineffective.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Just have no preference. Just want to be better. Most restrictions are pretty nervous to about this change, especially those who've been well for a long timebecause they're just worried that you're changing what is working. Why are you changing me? What's working for me. And though most of them should be just fine and should notice no change and in the adjustment. Some do and don't like it.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,4",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,06936300203",
        "Possibility of Change (Lay)": "Low",
        "Influence (R^2)": "0,1953333333",
        "Influence (Lay)": "Medium Low",
        "Trust / Fear Value (verbatim count mean)": "0,2",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,2",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "provider-derm",
        "Point Name":
          "Providers angry about AbbVie claiming HUMIRA is multiple different treatments, rather than saying “indications.”",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Wow, Gonzalez from ABBV claiming Humira is multiple different treatments even though it is one compound. This is of course incorrect, those are called 'indications' and the regulatory path for incremental indications is not the same as for individual new compounds.",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,5",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,06936300203",
        "Possibility of Change (Lay)": "Low",
        "Influence (R^2)": "0,1953333333",
        "Influence (Lay)": "Medium Low",
        "Trust / Fear Value (verbatim count mean)": "0,25",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,25",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "provider-rheum, provider-derm",
        "Point Name":
          "Providers feel disgust towards being forced to treat patients with HUMIRA first prior to putting patients on other options, such as INFLIXIMAB.",
        "Theme Score by Point 1": "Access",
        Quote:
          "RT @leoshmu Found a Phase 2 trial for infliximab here: . Sometimes I wonder if the Humira->Infliximab path is what is forced upon us by insurance requiring Humira failure before approving Infliximab... #dermjc",
        "Step of Journey": "Treatment Decision",
        "Sentiment (Value)": "0",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,5",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,06936300203",
        "Possibility of Change (Lay)": "Low",
        "Influence (R^2)": "0,1953333333",
        "Influence (Lay)": "Medium Low",
        "Trust / Fear Value (verbatim count mean)": "0,25",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,25",
        "Joy  / Anger Value (Lay)": "Medium Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "provider-gi, provider-rheum, provider-derm",
        "Point Name":
          "Providers find the prior authorization process painful; particularly the amount of resources needed to manage approvals  / denials.",
        "Theme Score by Point 1": "Access",
        Quote:
          "And then that goes to the pharmacy technician, not the pharmacist themselves, but a pharmacist technician who then reviews basic clinical information. Do they qualify as this moderate, severe Crohn disease? What insurance do they have? They're going to be okay.And then they'll give me an answer and then approve. And the whole system is very clunky. I don't know if this is too much information though.",
        "Step of Journey": "Practice Manager Processes Script with SP",
        "Sentiment (Value)": "-0,111111",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,35163",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,06955267154",
        "Possibility of Change (Lay)": "Low",
        "Influence (R^2)": "0,09566666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,1358",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,17583",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0,04",
        "Love  / Digust Value (Lay)": "High",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "provider-gi, provider-rheum",
        "Point Name":
          "Providers find it painful when forced switches occur late in the regimen after establishing good response.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "Patients have no preference. They just want to be better. Most patients are pretty nervous about this change, especially those who have been well for a long time,because they're just worried that you're changing what is working. Why are you changing what's working for me? Most of them should be just fine and and should notice no change in the adjustment. Some do, and don't like it.",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "-0,33035",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,49494",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,06955267154",
        "Possibility of Change (Lay)": "Low",
        "Influence (R^2)": "0,09566666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,34848",
        "Trust / Fear Value (Lay)": "Medium High",
        "Joy / Anger Value (verbatim count mean)": "0,14646",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "provider-gi, provider-rheum",
        "Point Name":
          "Hurdles in the delivery and inventory of therapies where some providers stock HUMIRA in their office and it risks expiring; also inverse of this with too many samples.",
        "Theme Score by Point 1": "Access",
        Quote:
          "So I think if the options were there to kind of ... Like guaranteed overnight shipment, then I think that would be the best and most cost-effective, because then you don't have to worry about the drugs going bad or expire, and the clinicians don't have to keep them in their office and they don't have to go through a lot of hoops to keep them in the hospital.",
        "Step of Journey": "SP Ships Medicine to Patient",
        "Sentiment (Value)": "-0,333333",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,319713",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,06955267154",
        "Possibility of Change (Lay)": "Low",
        "Influence (R^2)": "0,09566666667",
        "Influence (Lay)": "Low",
        "Trust / Fear Value (verbatim count mean)": "0,198285",
        "Trust / Fear Value (Lay)": "Low",
        "Joy / Anger Value (verbatim count mean)": "0,121428",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
      {
        "Point Type": "Hate",
        Stakeholder: "provider-gi",
        "Point Name":
          "Providers find it painful when patients who are on HUMIRA don’t consider other illnesses or diseases.",
        "Theme Score by Point 1": "Experience",
        Quote:
          "And now for your clotty Kenny update: there will not be any interventional surgery for now. His MRA and the ultrasound had two different findings. So they need another MRA. It looks as though more clot burden has occurred in a few of the collateral veins his body was using to compensate for the blockages in the femoral veins. And they are in a â€œchronicâ€ phase (they've been there a while). Interventional radiology does not want to stent the veins just yet and they want to give Kenny's body more time to find other collateral veins. But another MRA was ordered to check higher in his abdomen. They'd like to make sure that the inadequate blood flow isn't stemming from clotting in his abdomen. There's also some concern that Kenny has edema in both legs. His Humira is being increased in hopes that his condition shows more overall improvement. As always, I will update when more news becomes available",
        "Step of Journey": "Patient Assessment",
        "Sentiment (Value)": "-0,333333",
        "Sentiment (Lay)": "Low",
        "Love / Hate Score": "-0,4",
        "Love / Hate Score (Lay)": "Low",
        "Possibility of Change (RMSE)": "0,06936300203",
        "Possibility of Change (Lay)": "Low",
        "Influence (R^2)": "0,1953333333",
        "Influence (Lay)": "Medium Low",
        "Trust / Fear Value (verbatim count mean)": "0,2",
        "Trust / Fear Value (Lay)": "Medium Low",
        "Joy / Anger Value (verbatim count mean)": "0,2",
        "Joy  / Anger Value (Lay)": "Low",
        "Love / Disgust Value (verbatim count mean)": "0",
        "Love  / Digust Value (Lay)": "Low",
      },
    ],
  },
];

/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
/******************************************************************************************* FUNCTION: AJAX */
/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
var node0; //Mountain chart data object 
var node1; //Bubbles chart data object
var node2; //Lines chart data object

function getJSONData() {
  node0 = staticGlobalData[0].data;
  node1 = staticGlobalData[1].data;
  node2 = staticGlobalData[2].data;
  mainTableData = node2;
  drawBubbles();

  /*var currHostname = window.location.hostname;
    if(currHostname == "localhost"){
        var dataURL = "_static_data/db.json";
    }else{
        var dataURL = "../core/views/readFulll.php";
    }    
    
    $.ajax({
        url: dataURL,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(data) {
            node0 = data[0].data;
            node1 = data[1].data;
            node2 = data[2].data;
            mainTableData = node2;
            drawBubbles();
        }
    });
    */
}

/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
/*********************************************************************************** FUNCTION: DRAW BUBBLES */
/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
function drawBubbles() {
  /*45º labels for bubbles chart*/
  $(node0).each(function (index, value) {
    $.each(value, function (nodeName, nodeValue) {
      $("#bubbles-stack").append(
        "<div><span>" +
          nodeName +
          '<a href="#" data-moment="' +
          nodeName +
          '"></a></span></div>'
      );
      $("#bubbles-container").append(
        '<div data-label="' + nodeName + '"></div>'
      );

      //Fill the arrays for "mountains" chart.
      let text = nodeValue;
      let result = Number(text.replace(/,/g, "."));
      chartMountainsValue.push(result);
      chartMountainsAveragePoint += result;
    });
  });

  /*Bubbles creation with tooltip*/
  $(node1).each(function (index, value) {
    var data_moment = value["Journey Moment"];
    var data_order = value["Bubble Order"];
    var data_felling = value["Hate or Love"];
    var data_theme_experience = value["Theme"];

    //Importance Score (Label)
    var data_importance_score_label = value["Importance Score (Label)"];

    //Importance Score (Scaled)
    var data_importance_score_scaled = value["Importance Score (Scaled)"];
    var data_importance_score_scaled_number =
      data_importance_score_scaled.replace(/,/g, ".");
    var data_size = parseInt(data_importance_score_scaled_number * 5);

    var data_theme_infos = "";
    var data_download = value["Donwload IR"];
    var data_stakeholder = value["Stakeholder"];

    var extraclasses =
      normalizeStr(data_felling) +
      " " +
      normalizeStr(data_theme_experience) +
      " " +
      normalizeStr(data_importance_score_label);

    var tooltip =
      "<div class='tooltip'><span>Theme: " +
      data_theme_experience +
      "<br><span>" +
      data_theme_infos +
      "</span></span><a class='visualize-points' href='#'>Visualize Points</a><a href='" +
      data_download +
      "' target='_blank'>Download Recommendation</a></div>";

    $.each(value, function (nodeName, nodeValue) {
      var bubbleBox = $("#bubbles-container").find(
        "[data-label='" + nodeValue + "']"
      );
      bubbleBox.append(
        '<div class="single-bubble ' +
          extraclasses +
          '" data-moment="' +
          data_moment +
          '" data-order="' +
          data_order +
          '" data-feeling="' +
          data_felling +
          '" data-theme-experience="' +
          data_theme_experience +
          '" data-score-scaled="' +
          data_importance_score_scaled +
          '" data-score-label="' +
          data_importance_score_label +
          '" data-size="' +
          data_size +
          '" data-download="' +
          data_download +
          '" data-stakeholder="' +
          data_stakeholder +
          '">' +
          tooltip +
          "</div>"
      );
    });

    // |||||| FILTER BUBBLES ||||| Fill the arrays for filtering bubbles
    if (!bubblesArrLoveHate.includes(data_felling)) {
      bubblesArrLoveHate.push(data_felling);
    }
    if (!bubblesArrTheme.includes(data_theme_experience)) {
      bubblesArrTheme.push(data_theme_experience);
    }
    if (!bubblesArrImportance.includes(data_importance_score_label)) {
      bubblesArrImportance.push(data_importance_score_label);
    }
  });

  /*Passing parameters from bubbles colunms labels for filtering lines results*/
  $(".bubbles-stack > div > span > a").on("click", function (e) {
    e.preventDefault();
    var columnMoment = $(this).attr("data-moment");

    // Clear any previous filters
    var $target = $(".filters-lines .dropdown-menu a"),
      $inp = $target.find("input");

    $target.removeClass("checked");
    setTimeout(function () {
      $inp.prop("checked", false);
    }, 0);

    optionsfilterLines1 = optionsfilterLines2 = optionsfilterLines3 = [];

    //Check Lines Filter Option for Step of Journey
    var $target1 = $(
        ".filterLines1 .dropdown-menu a[data-value='" + columnMoment + "']"
      ),
      val1 = columnMoment,
      $inp1 = $target1.find("input"),
      idx1;

    var isChecked1 = !$target1.hasClass("checked")
      ? $target1.addClass("checked")
      : $target1.removeClass("checked");

    if ((idx1 = optionsfilterLines1.indexOf(val1)) > -1) {
      //optionsfilterLines1.splice( idx, 1 );
      //setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
    } else {
      optionsfilterLines1.push(val1);
      setTimeout(function () {
        $inp1.prop("checked", true);
      }, 0);
    }

    applyLinesFilters();
    changeSections("#LoveandHatePointsExplorer", "loveandhate");
    return false;
  });

  /*Passing parameters from tooltip for filtering lines results*/
  $(".visualize-points").on("click", function (e) {
    e.preventDefault();
    var thisMoment = $(this).parent().parent().attr("data-moment");
    var thisTheme = $(this).parent().parent().attr("data-theme-experience");

    // Clear any previous filters
    var $target = $(".filters-lines .dropdown-menu a"),
      $inp = $target.find("input");

    $target.removeClass("checked");
    setTimeout(function () {
      $inp.prop("checked", false);
    }, 0);

    optionsfilterLines1 = optionsfilterLines2 = optionsfilterLines3 = [];

    //Check Lines Filter Option for Step of Journey
    var $target1 = $(
        ".filterLines1 .dropdown-menu a[data-value='" + thisMoment + "']"
      ),
      val1 = thisMoment,
      $inp1 = $target1.find("input"),
      idx1;

    var isChecked1 = !$target1.hasClass("checked")
      ? $target1.addClass("checked")
      : $target1.removeClass("checked");

    if ((idx1 = optionsfilterLines1.indexOf(val1)) > -1) {
      //optionsfilterLines1.splice( idx, 1 );
      //setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
    } else {
      optionsfilterLines1.push(val1);
      setTimeout(function () {
        $inp1.prop("checked", true);
      }, 0);
    }

    //Check Lines Filter Option for Theme
    var $target2 = $(
        ".filterLines2 .dropdown-menu a[data-value='" + thisTheme + "']"
      ),
      val2 = thisTheme,
      $inp2 = $target2.find("input"),
      idx2;

    var isChecked2 = !$target2.hasClass("checked")
      ? $target2.addClass("checked")
      : $target2.removeClass("checked");

    if ((idx2 = optionsfilterLines2.indexOf(val2)) > -1) {
      //optionsfilterLines1.splice( idx, 1 );
      //setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
    } else {
      optionsfilterLines2.push(val2);
      setTimeout(function () {
        $inp2.prop("checked", true);
      }, 0);
    }

    applyLinesFilters();
    changeSections("#LoveandHatePointsExplorer", "loveandhate");
    return false;
  });

  createBubblesFilters();
}

/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************* FUNCTION: CREATE BUBBLES FILTERS */
/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
// https://codepen.io/bseth99/pen/ZEMrbP // Dropdown

/********** Definition of bubbles filters */
var bubblesArrLoveHate = [];
var LoveHateButtonLabel = "Love and Hate";

var bubblesArrTheme = [];
var ThemeButtonLabel = "Theme";

var bubblesArrImportance = [];
var ImportanceButtonLabel = "Importance";

var optionsfilterBubbles1 = [];
var optionsfilterBubbles2 = [];
var optionsfilterBubbles3 = [];

function createBubblesFilters() {
  // |||||| FILTER BUBBLES |||||
  // Assembly: Love and Hate
  bubblesArrLoveHate.sort();
  var loopLoveHate = "";

  for (i = 0; i < bubblesArrLoveHate.length; i++) {
    let strLoveHate = bubblesArrLoveHate[i];
    let tempLoveHate = normalizeStr(strLoveHate);
    loopLoveHate +=
      '<li><a href="#" data-value="' +
      tempLoveHate +
      '" tabIndex="-1"><input type="checkbox"/>' +
      strLoveHate +
      "</a></li>";
  }

  var filterBubbles1 =
    '<div class="filters-collunm filterBubbles1">' +
    '<button type="button" class="dropdown-toggle" data-toggle="dropdown">' +
    LoveHateButtonLabel +
    "</button>" +
    '<ul class="dropdown-menu">' +
    loopLoveHate +
    "</ul>" +
    "</div>";

  $(".filters-bubbles").append(filterBubbles1);

  // Actions for: Love and Hate
  $(".filterBubbles1 .dropdown-menu a").on("click", function (event) {
    var $target = $(event.currentTarget),
      val = $target.attr("data-value"),
      $inp = $target.find("input"),
      idx;

    var isChecked = !$target.hasClass("checked")
      ? $target.addClass("checked")
      : $target.removeClass("checked");

    if ((idx = optionsfilterBubbles1.indexOf(val)) > -1) {
      optionsfilterBubbles1.splice(idx, 1);
      setTimeout(function () {
        $inp.prop("checked", false);
      }, 0);
      if (optionsfilterBubbles1.length == 0) {
        $target.parent().parent().parent().removeClass("active");
      }
    } else {
      optionsfilterBubbles1.push(val);
      setTimeout(function () {
        $inp.prop("checked", true);
      }, 0);
      if (optionsfilterBubbles1.length > 0) {
        $target.parent().parent().parent().addClass("active");
      }
    }

    $(event.target).blur();

    applyBubblesFilters();

    return false;
  });

  // Assembly: Theme
  bubblesArrTheme.sort();
  var loopTheme = "";

  for (i = 0; i < bubblesArrTheme.length; i++) {
    let strTheme = bubblesArrTheme[i];
    let tempTheme = normalizeStr(strTheme);
    loopTheme +=
      '<li><a href="#" data-value="' +
      tempTheme +
      '" tabIndex="-1"><input type="checkbox"/>' +
      strTheme +
      "</a></li>";
  }

  var filterBubbles2 =
    '<div class="filters-collunm filterBubbles2">' +
    '<button type="button" class="dropdown-toggle" data-toggle="dropdown">' +
    ThemeButtonLabel +
    "</button>" +
    '<ul class="dropdown-menu">' +
    loopTheme +
    "</ul>" +
    "</div>";

  $(".filters-bubbles").append(filterBubbles2);

  // Actions for: Theme
  $(".filterBubbles2 .dropdown-menu a").on("click", function (event) {
    var $target = $(event.currentTarget),
      val = $target.attr("data-value"),
      $inp = $target.find("input"),
      idx;

    var isChecked = !$target.hasClass("checked")
      ? $target.addClass("checked")
      : $target.removeClass("checked");

    if ((idx = optionsfilterBubbles2.indexOf(val)) > -1) {
      optionsfilterBubbles2.splice(idx, 1);
      setTimeout(function () {
        $inp.prop("checked", false);
      }, 0);
      if (optionsfilterBubbles2.length == 0) {
        $target.parent().parent().parent().removeClass("active");
      }
    } else {
      optionsfilterBubbles2.push(val);
      setTimeout(function () {
        $inp.prop("checked", true);
      }, 0);
      if (optionsfilterBubbles2.length > 0) {
        $target.parent().parent().parent().addClass("active");
      }
    }

    $(event.target).blur();

    applyBubblesFilters();

    return false;
  });

  // Assembly: Importance
  bubblesArrImportance.sort();
  var loopImportance = "";

  for (i = 0; i < bubblesArrImportance.length; i++) {
    let strImportance = bubblesArrImportance[i];
    let tempImportance = normalizeStr(strImportance);
    loopImportance +=
      '<li><a href="#" data-value="' +
      tempImportance +
      '" tabIndex="-1"><input type="checkbox"/>' +
      strImportance +
      "</a></li>";
  }

  var filterBubbles3 =
    '<div class="filters-collunm filterBubbles3">' +
    '<button type="button" class="dropdown-toggle" data-toggle="dropdown">' +
    ImportanceButtonLabel +
    "</button>" +
    '<ul class="dropdown-menu">' +
    loopImportance +
    "</ul>" +
    "</div>";

  $(".filters-bubbles").append(filterBubbles3);

  // Actions for: Importance
  $(".filterBubbles3 .dropdown-menu a").on("click", function (event) {
    var $target = $(event.currentTarget),
      val = $target.attr("data-value"),
      $inp = $target.find("input"),
      idx;

    var isChecked = !$target.hasClass("checked")
      ? $target.addClass("checked")
      : $target.removeClass("checked");

    if ((idx = optionsfilterBubbles3.indexOf(val)) > -1) {
      optionsfilterBubbles3.splice(idx, 1);
      setTimeout(function () {
        $inp.prop("checked", false);
      }, 0);
      if (optionsfilterBubbles3.length == 0) {
        $target.parent().parent().parent().removeClass("active");
      }
    } else {
      optionsfilterBubbles3.push(val);
      setTimeout(function () {
        $inp.prop("checked", true);
      }, 0);
      if (optionsfilterBubbles3.length > 0) {
        $target.parent().parent().parent().addClass("active");
      }
    }

    $(event.target).blur();

    applyBubblesFilters();

    return false;
  });

  drawMountains();
}

/************************************************************************************************************/
/************************************************************************** FUNCTION: APPLY BUBBLES FILTERS */
/************************************************************************************************************/
function applyBubblesFilters() {
  var allBubblesFilters =
    optionsfilterBubbles1.length +
    optionsfilterBubbles2.length +
    optionsfilterBubbles3.length;

  // If all filters arrays are empty, clear all past filtered matches.
  if (allBubblesFilters === 0) {
    $targetAllBubbles = $(
      ".filters-bubbles .filters-collunm .dropdown-menu li a"
    );
    $targetAllBubbles.removeClass("checked");
    $inpAllBubbles = $targetAllBubbles.find("input");
    setTimeout(function () {
      $inpAllBubbles.prop("checked", false);
    }, 0);
    $(".filters-bubbles .filters-collunm").removeClass("active");

    $(".single-bubble").removeClass("matched");
    $("body").removeClass("bubbles-filter-active");
    $(".filters-bubbles .reset-filters").css("display", "none");
  }

  // If any filter array is not empty, run the loops to create the rules.
  if (allBubblesFilters > 0) {
    $(".filters-bubbles .reset-filters").css("display", "block");

    var tempStr = "";
    var strfilter = "";
    var objsArr = [];

    if (
      optionsfilterBubbles1.length === 0 &&
      optionsfilterBubbles2.length > 0 &&
      optionsfilterBubbles3.length === 0
    ) {
      $(optionsfilterBubbles2).each(function (index, value) {
        tempStr = ".single-bubble." + value;
        if (objsArr.indexOf(tempStr) === -1) {
          objsArr.push(tempStr);
        }
      });
    } else if (
      optionsfilterBubbles1.length === 0 &&
      optionsfilterBubbles2.length === 0 &&
      optionsfilterBubbles3.length > 0
    ) {
      $(optionsfilterBubbles3).each(function (index, value) {
        tempStr = ".single-bubble." + value;
        if (objsArr.indexOf(tempStr) === -1) {
          objsArr.push(tempStr);
        }
      });
    } else if (
      optionsfilterBubbles1.length === 0 &&
      optionsfilterBubbles2.length > 0 &&
      optionsfilterBubbles3.length > 0
    ) {
      $(optionsfilterBubbles3).each(function (index, value) {
        $(optionsfilterBubbles2).each(function (idx, val) {
          tempStr = ".single-bubble." + val + "." + value;
          if (objsArr.indexOf(tempStr) === -1) {
            objsArr.push(tempStr);
          }
        });
      });
    } else if (
      optionsfilterBubbles1.length > 0 &&
      optionsfilterBubbles2.length === 0 &&
      optionsfilterBubbles3.length === 0
    ) {
      $(optionsfilterBubbles1).each(function (index, value) {
        tempStr = ".single-bubble." + value;
        if (objsArr.indexOf(tempStr) === -1) {
          objsArr.push(tempStr);
        }
      });
    } else if (
      optionsfilterBubbles1.length > 0 &&
      optionsfilterBubbles2.length > 0 &&
      optionsfilterBubbles3.length === 0
    ) {
      $(optionsfilterBubbles2).each(function (index, value) {
        $(optionsfilterBubbles1).each(function (idx, val) {
          tempStr = ".single-bubble." + val + "." + value;
          if (objsArr.indexOf(tempStr) === -1) {
            objsArr.push(tempStr);
          }
        });
      });
    } else if (
      optionsfilterBubbles1.length > 0 &&
      optionsfilterBubbles2.length === 0 &&
      optionsfilterBubbles3.length > 0
    ) {
      $(optionsfilterBubbles3).each(function (index, value) {
        $(optionsfilterBubbles1).each(function (idx, val) {
          tempStr = ".single-bubble." + val + "." + value;
          if (objsArr.indexOf(tempStr) === -1) {
            objsArr.push(tempStr);
          }
        });
      });
    } else if (
      optionsfilterBubbles1.length > 0 &&
      optionsfilterBubbles2.length > 0 &&
      optionsfilterBubbles3.length > 0
    ) {
      $(optionsfilterBubbles3).each(function (index, value) {
        $(optionsfilterBubbles2).each(function (idx, val) {
          $(optionsfilterBubbles1).each(function (id, vl) {
            tempStr = ".single-bubble." + vl + "." + val + "." + value;
            if (objsArr.indexOf(tempStr) === -1) {
              objsArr.push(tempStr);
            }
          });
        });
      });
    }

    $(objsArr).each(function (index, value) {
      if (index + 1 < objsArr.length) {
        var tempStrFinal = value + ", ";
      } else {
        var tempStrFinal = value;
      }
      strfilter += tempStrFinal;
    });

    $(".single-bubble").removeClass("matched");
    $(strfilter).addClass("matched");
    $("body").addClass("bubbles-filter-active");
  }
}

/************************************************************************************************************/
/************************************************************************** FUNCTION: RESET BUBBLES FILTERS */
/************************************************************************************************************/
function resetBubblesFilters() {
  optionsfilterBubbles1.length =
    optionsfilterBubbles2.length =
    optionsfilterBubbles3.length =
      0;
  applyBubblesFilters();
  /*
    $(".single-bubble").removeClass("matched");
    $("body").removeClass("bubbles-filter-active");
    $(".filters-bubbles .reset-filters").css("display", "none");

    console.log("optionsfilterBubbles1: "+optionsfilterBubbles1)
    */
}

/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
/********************************************************************************* FUNCTION: DRAW MOUNTAINS */
/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
var chartMountainsValue = []; // Array to receive node0 values from drawBubbles() to generate the mountains values.
var chartMountainsAveragePoint = 0; // Will define the average point of the node0 values to start and finish "mountains" chart.

function drawMountains() {
  /*Average point to start and end of the Mountains chart*/
  chartMountainsAveragePoint =
    chartMountainsAveragePoint / chartMountainsValue.length; //Average point to start the chart;
  chartMountainsValue.unshift(chartMountainsAveragePoint); //Insert the average number at the first position of the array;
  chartMountainsValue.push(chartMountainsAveragePoint); //Insert the average number at the last position of the array;

  const ctx_mountains = document
    .getElementById("chartMountains")
    .getContext("2d");
  const ctx_mountains_height = $("#chartMountains").innerHeight();
  const gradientBg = ctx_mountains.createLinearGradient(
    0,
    0,
    0,
    ctx_mountains_height
  );
  gradientBg.addColorStop(0, "#611bff");
  gradientBg.addColorStop(0.9, "#151A24");
  gradientBg.addColorStop(1, "#131821");

  const dataMountains = {
    labels: [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    datasets: [
      {
        label: " ",
        data: chartMountainsValue,
        backgroundColor: gradientBg,
        borderColor: "#611bff",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const myChartMountains = new Chart(ctx_mountains, {
    type: "line",
    data: dataMountains,
    options: {
      responsive: true,
      plugins: {
        // remove the top dataset legend
        legend: {
          display: false,
        },
      },
      scales: {
        // remove the y.axis numbers
        x: {
          beginAtZero: true,
          ticks: {
            display: false,
          },
          grid: {
            drawTicks: false,
            drawOnChartArea: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            display: false,
          },
          grid: {
            drawTicks: false,
            drawOnChartArea: false,
          },
        },
      },
    },
  });

  drawLines();
}

/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************* FUNCTION: DRAW LINES */
/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
var chartLinesValue = [];
var myChartLines;
var newTooltip = 0;

function drawLines() {
  const ctx_lines = document.getElementById("chartLines").getContext("2d");
  const ctx_lines_height = $("#chartLines").innerHeight();
  const gradientLINES = ctx_lines.createLinearGradient(
    0,
    0,
    0,
    ctx_lines_height
  );
  gradientLINES.addColorStop(0, "#279c7f");
  gradientLINES.addColorStop(0.25, "#38d6ae");
  gradientLINES.addColorStop(0.41, "#925aff");
  gradientLINES.addColorStop(0.5, "#611bff");
  gradientLINES.addColorStop(0.59, "#925aff");
  gradientLINES.addColorStop(0.75, "#f82c91");
  gradientLINES.addColorStop(1, "#b61d69");

  $(node2).each(function (index, value) {
    var data_lines_stepofthejourney = value["Step of Journey"];
    var data_lines_theme_experience = value["Theme Score by Point 1"];
    var data_lines_stakeholder = value["Stakeholder"];
    var data_lines_desc_full = value["Point Name"];

    var loveHateStr = value["Love / Hate Score"];
    var loveHateRpl = loveHateStr.replace(/,/g, ".");
    var nodeStr = JSON.parse(
      '{ "dataFilter3": "' +
        data_lines_stakeholder +
        '", "dataFilter2": "' +
        data_lines_theme_experience +
        '", "dataFilter1": "' +
        data_lines_stepofthejourney +
        '", "id": ' +
        index +
        ', "data": [0, ' +
        loveHateRpl +
        ', 0], "borderColor": "#fff", "borderWidth": 1.25, "fill": false }'
    );
    chartLinesValue.push(nodeStr);
    chartLinesValue[index]["borderColor"] = gradientLINES;

    // |||||| FILTER LINES ||||| Fill the arrays for filtering lines
    if (!linesArrStepJourney.includes(data_lines_stepofthejourney)) {
      linesArrStepJourney.push(data_lines_stepofthejourney);
    }
    if (!linesArrTheme.includes(data_lines_theme_experience)) {
      linesArrTheme.push(data_lines_theme_experience);
    }
    if (!linesArrStakeholder.includes(data_lines_stakeholder)) {
      linesArrStakeholder.push(data_lines_stakeholder);
    }

    //  |||||| LIST VIEW ||||| Create list items
    var loveHateNum = parseFloat(loveHateRpl).toFixed(3);
    var newBGColorValue = parseInt((loveHateNum * 100 - 100) * -0.5);
    var itemListBGColor = getColor(newBGColorValue);

    var itemListViewTPL =
      "" +
      '<div class="item" data-sort="' +
      loveHateNum +
      '" data-id="' +
      index +
      '" style="background-color: ' +
      itemListBGColor +
      '">' +
      '<div class="item-numb">Point<br><span>#' +
      index +
      "</span></div>" +
      '<div class="item-desc">' +
      data_lines_desc_full +
      "</div>" +
      '<div class="item-scor"><small>Love/Hate Score</small><span>' +
      loveHateNum +
      "</span></div>" +
      '<div class="item-link">' +
      '<div class="col-b" data-link="' +
      index +
      '">' +
      "<span>View more</span>" +
      '<button class="btn-tooltip"></button>' +
      "</div>" +
      "</div>" +
      "</div>";

    $(".list-view .center-wrapper").append(itemListViewTPL);
  });

  function sortList() {
    const result = [...$(".list-view .item")].sort((a, b) => {
      const contentA = parseFloat($(a).data("sort"));
      const contentB = parseFloat($(b).data("sort"));
      return contentA > contentB ? -1 : contentA < contentB ? 1 : 0;
    });

    $(".list-view").find(".center-wrapper").html(result);

    return true;
  }

  sortList();

  $("[data-link]").on("click", function (e) {
    e.preventDefault();
    var myID = $(this).attr("data-link");
    if (myID != undefined) {
      updatePoint(myID);
      changeSections("#LoveandHatePointsExplorer", "pointsbypoints");
    }
  });

  const dataLines = {
    labels: [-1, 0, 1],
    datasets: chartLinesValue,
  };

  myChartLines = new Chart(ctx_lines, {
    type: "line",
    data: dataLines,
    options: {
      onHover: (evt, activeElements, chart) => {
        if (
          evt.type == "mousemove" &&
          activeElements[0].datasetIndex >= 0 &&
          activeElements[0].datasetIndex != newTooltip
        ) {
          const elemDatasetIndex = activeElements[0].datasetIndex;
          newTooltip = elemDatasetIndex;
          const elemID = myChartLines.data.datasets[elemDatasetIndex].id;
          const elemVAL =
            myChartLines.data.datasets[elemDatasetIndex].data[1].toFixed(3);

          var elemDESCFull = node2[elemID]["Point Name"];
          var elemDESCLength = 160;
          var elemDESCFinal =
            elemDESCFull.length > elemDESCLength
              ? elemDESCFull.substring(0, elemDESCLength - 3) + "..."
              : elemDESCFull;

          const elemINDEX = activeElements[0].index;
          const elemX = activeElements[0].element.x;
          const elemY = activeElements[0].element.y;
          updateCustomLinesTooltip(
            elemDatasetIndex,
            elemINDEX,
            elemX,
            elemY,
            elemID,
            elemVAL,
            elemDESCFinal
          );
        }
      },

      // Hover points settings
      hitRadius: 20,
      pointRadius: 0,
      pointHoverRadius: 10,
      pointHitRadius: 20,
      pointHoverBorderWidth: 1.5,
      pointHoverBackgroundColor: "#000d1b",

      tension: 0.35,
      responsive: true,
      interaction: {
        mode: "nearest",
        intersect: false,
      },
      scales: {
        x: {
          offset: true,
          min: -1,
          max: 1,
          beginAtZero: true,
          ticks: {
            display: false,
          },
          grid: {
            drawTicks: false,
            drawOnChartArea: false,
          },
        },
        y: {
          offset: true,
          min: -1,
          max: 1,
          beginAtZero: true,
          ticks: {
            display: false,
          },
          grid: {
            drawTicks: false,
            drawOnChartArea: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false, // <-- this option disables tooltips
        },
      },
    },
  });

  function updateCustomLinesTooltip(
    datasetIDX,
    pointIDX,
    pointX,
    pointY,
    pointID,
    pointVAL,
    pointDESC
  ) {
    if (pointIDX === 1) {
      var newColorValue = parseInt((pointVAL * 100 - 100) * -0.5);
      var tooltipBGColor = getColor(newColorValue);
      $("#customLinesTooltip")
        .find("[data-point]")
        .text("Point #" + pointID);
      $("#customLinesTooltip").find("[data-value]").text(pointVAL);
      $("#customLinesTooltip").find("[data-link]").attr("data-link", pointID);
      $("#customLinesTooltip").find("[data-desc]").text(pointDESC);
      $("#customLinesTooltip").css({
        display: "flex",
        top: pointY,
        "background-color": tooltipBGColor,
      });
      $("#customLinesTooltip").css("--dynamiccolor", tooltipBGColor);
    } else {
      hideTooltipLines();
    }
  }

  /*
    document.getElementById("chartLines").onclick = function (evt) {
        var activePoints = myChartLines.getElementsAtEventForMode(evt, 'point', myChartLines.options);
        var clickedIndex = activePoints[0]['datasetIndex']; 
        var value = myChartLines.data.datasets[clickedIndex].id; // Retorna chartLinesValue[position!!!]        
        updatePoint(value);
        changeSections('#LoveandHatePointsExplorer', 'pointsbypoints');

        //https://stackoverflow.com/questions/25514802/how-to-add-an-on-click-event-to-my-line-chart-using-chart-js
    };
    */

  createLinesFilters();
}

/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
/********************************************************************************** FUNCTION: LINES FILTERS */
/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
/********** Definition of lines filters */
var linesArrStepJourney = [];
var LinesStepJourneyButtonLabel = "Step of the Journey";

var linesArrTheme = [];
var LinesThemeButtonLabel = "Theme";

var linesArrStakeholder = [];
var LinesStakeholderButtonLabel = "Stakeholder";

var optionsfilterLines1 = [];
var optionsfilterLines2 = [];
var optionsfilterLines3 = [];

function createLinesFilters() {
  // |||||| FILTER BUBBLES |||||
  // Assembly: Lines Step of the Journey
  linesArrStepJourney.sort();
  var loopLinesStepJourney = "";

  for (i = 0; i < linesArrStepJourney.length; i++) {
    let strLinesStepJourney = linesArrStepJourney[i];
    let tempLinesStepJourney = normalizeStr(strLinesStepJourney);
    loopLinesStepJourney +=
      '<li><a href="#" data-value="' +
      strLinesStepJourney +
      '" tabIndex="-1"><input type="checkbox"/>' +
      strLinesStepJourney +
      "</a></li>";
  }

  var filterLines1 =
    '<div class="filters-collunm filterLines1">' +
    '<button type="button" class="dropdown-toggle" data-toggle="dropdown">' +
    LinesStepJourneyButtonLabel +
    "</button>" +
    '<ul class="dropdown-menu">' +
    loopLinesStepJourney +
    "</ul>" +
    "</div>";

  $(".filters-lines").append(filterLines1);

  // Actions for: Lines Step of the Journey
  $(".filterLines1 .dropdown-menu a").on("click", function (event) {
    var $target = $(event.currentTarget),
      val = $target.attr("data-value"),
      $inp = $target.find("input"),
      idx;

    var isChecked = !$target.hasClass("checked")
      ? $target.addClass("checked")
      : $target.removeClass("checked");

    if ((idx = optionsfilterLines1.indexOf(val)) > -1) {
      optionsfilterLines1.splice(idx, 1);
      setTimeout(function () {
        $inp.prop("checked", false);
      }, 0);
      if (optionsfilterLines1.length == 0) {
        $target.parent().parent().parent().removeClass("active");
      }
    } else {
      optionsfilterLines1.push(val);
      setTimeout(function () {
        $inp.prop("checked", true);
      }, 0);
      if (optionsfilterLines1.length > 0) {
        $target.parent().parent().parent().addClass("active");
      }
    }

    $(event.target).blur();

    applyLinesFilters();

    return false;
  });

  // Assembly: Lines Theme
  linesArrTheme.sort();
  var loopLinesTheme = "";

  for (i = 0; i < linesArrTheme.length; i++) {
    let strLinesTheme = linesArrTheme[i];
    let tempLinesTheme = normalizeStr(strLinesTheme);
    loopLinesTheme +=
      '<li><a href="#" data-value="' +
      strLinesTheme +
      '" tabIndex="-1"><input type="checkbox"/>' +
      strLinesTheme +
      "</a></li>";
  }

  var filterLines2 =
    '<div class="filters-collunm filterLines2">' +
    '<button type="button" class="dropdown-toggle" data-toggle="dropdown">' +
    LinesThemeButtonLabel +
    "</button>" +
    '<ul class="dropdown-menu">' +
    loopLinesTheme +
    "</ul>" +
    "</div>";

  $(".filters-lines").append(filterLines2);

  // Actions for: Lines Theme
  $(".filterLines2 .dropdown-menu a").on("click", function (event) {
    var $target = $(event.currentTarget),
      val = $target.attr("data-value"),
      $inp = $target.find("input"),
      idx;

    var isChecked = !$target.hasClass("checked")
      ? $target.addClass("checked")
      : $target.removeClass("checked");

    if ((idx = optionsfilterLines2.indexOf(val)) > -1) {
      optionsfilterLines2.splice(idx, 1);
      setTimeout(function () {
        $inp.prop("checked", false);
      }, 0);
      if (optionsfilterLines2.length == 0) {
        $target.parent().parent().parent().removeClass("active");
      }
    } else {
      optionsfilterLines2.push(val);
      setTimeout(function () {
        $inp.prop("checked", true);
      }, 0);
      if (optionsfilterLines2.length > 0) {
        $target.parent().parent().parent().addClass("active");
      }
    }

    $(event.target).blur();

    applyLinesFilters();

    return false;
  });

  // Assembly: Lines Stakeholder
  linesArrStakeholder.sort();
  var loopLinesStakeholder = "";

  for (i = 0; i < linesArrStakeholder.length; i++) {
    let strLinesStakeholder = linesArrStakeholder[i];
    let strLinesStakeholderLabel = "";

    if (strLinesStakeholder.indexOf(",") == -1) {
      switch (strLinesStakeholder) {
        case "patient":
          strLinesStakeholderLabel = "Patient";
          break;
        case "payer":
          strLinesStakeholderLabel = "Payer";
          break;
        case "pbm":
          strLinesStakeholderLabel = "PBM";
          break;
        case "pm":
          strLinesStakeholderLabel = "PM";
          break;
        case "provider-derm":
          strLinesStakeholderLabel = "Dermatologist";
          break;
        case "provider-gi":
          strLinesStakeholderLabel = "Gastroenterologist";
          break;
        case "provider-rheum":
          strLinesStakeholderLabel = "Rheumatologist";
          break;
        default:
          strLinesStakeholderLabel = "Others";
      }
      let tempLinesStakeholder = normalizeStr(strLinesStakeholder);
      loopLinesStakeholder +=
        '<li><a href="#" data-value="' +
        tempLinesStakeholder +
        '" tabIndex="-1"><input type="checkbox"/>' +
        strLinesStakeholderLabel +
        "</a></li>";
    }
  }

  var filterLines3 =
    '<div class="filters-collunm filterLines3">' +
    '<button type="button" class="dropdown-toggle" data-toggle="dropdown">' +
    LinesStakeholderButtonLabel +
    "</button>" +
    '<ul class="dropdown-menu">' +
    loopLinesStakeholder +
    "</ul>" +
    "</div>";

  $(".filters-lines").append(filterLines3);

  // Actions for: Lines Stakeholder
  $(".filterLines3 .dropdown-menu a").on("click", function (event) {
    var $target = $(event.currentTarget),
      val = $target.attr("data-value"),
      $inp = $target.find("input"),
      idx;

    var isChecked = !$target.hasClass("checked")
      ? $target.addClass("checked")
      : $target.removeClass("checked");

    if ((idx = optionsfilterLines3.indexOf(val)) > -1) {
      optionsfilterLines3.splice(idx, 1);
      setTimeout(function () {
        $inp.prop("checked", false);
      }, 0);
      if (optionsfilterLines3.length == 0) {
        $target.parent().parent().parent().removeClass("active");
      }
    } else {
      optionsfilterLines3.push(val);
      setTimeout(function () {
        $inp.prop("checked", true);
      }, 0);
      if (optionsfilterLines3.length > 0) {
        $target.parent().parent().parent().addClass("active");
      }
    }

    $(event.target).blur();

    applyLinesFilters();

    return false;
  });

  // Actions for all dropdown-toggles
  $(".dropdown-toggle").on("click", function (event) {
    var $droptarget = $(event.currentTarget);
    if (!$droptarget.hasClass("active")) {
      $droptarget.addClass("active");
      $(this).parent().find(".dropdown-menu").css("display", "block");
    } else {
      $droptarget.removeClass("active");
      $(this).parent().find(".dropdown-menu").css("display", "none");
    }
    // Define if the button apply filter is visible or not
    if (!$(".dropdown-toggle").hasClass("active")) {
      $(".apply-filters").css("display", "none");
    } else {
      $(".apply-filters").css("display", "block");
    }
  });

  $(".mCustomScrollbar").mCustomScrollbar({
    theme: "minimal",
  });

  updatePoint(0);
  preloaderExit();
}

/************************************************************************************************************/
/**************************************************************************** FUNCTION: APPLY LINES FILTERS */
/************************************************************************************************************/
var finalFilteredArrayObj = [];
var finalFilteredArrayIDs = [];

function applyLinesFilters() {
  var filteredLines1 = [];
  var filteredLines2 = [];
  var filteredLines3 = [];
  var compareFilters = [];
  finalFilteredArrayObj = [];
  finalFilteredArrayIDs = [];

  myChartLines.data.datasets = chartLinesValue;
  myChartLines.update();

  var allLinesFilters =
    optionsfilterLines1.length +
    optionsfilterLines2.length +
    optionsfilterLines3.length;

  // If all filters arrays are empty, clear all past filtered matches.
  if (allLinesFilters === 0) {
    $targetAllLines = $(".filters-lines .filters-collunm .dropdown-menu li a");
    $targetAllLines.removeClass("checked");
    $inpAllLines = $targetAllLines.find("input");
    setTimeout(function () {
      $inpAllLines.prop("checked", false);
    }, 0);
    $(".filters-lines .filters-collunm").removeClass("active");

    $(".list-view .item").removeClass("matched");
    $("body").removeClass("lines-filter-active");
    $(".filters-lines .reset-filters").css("display", "none");
  }

  if (allLinesFilters > 0) {
    $(".filters-lines .reset-filters").css("display", "block");

    let i = 0;
    for (i = 0; i < myChartLines.data.datasets.length; i++) {
      const filterData1 = myChartLines.data.datasets[i].dataFilter1;
      const filterData2 = myChartLines.data.datasets[i].dataFilter2;
      const filterData3 = myChartLines.data.datasets[i].dataFilter3;
      const arrfilterData3 = filterData3.replace(/\s/g, "").split(",");

      if (optionsfilterLines1.includes(filterData1)) {
        filteredLines1.push(i);
      }

      if (optionsfilterLines2.includes(filterData2)) {
        filteredLines2.push(i);
      }

      $(arrfilterData3).each(function (index, value) {
        if (optionsfilterLines3.includes(value)) {
          filteredLines3.push(i);
        }
      });
    }

    if (filteredLines1.length > 0) {
      compareFilters.push(filteredLines1);
    }
    if (filteredLines2.length > 0) {
      compareFilters.push(filteredLines2);
    }
    if (filteredLines3.length > 0) {
      compareFilters.push(filteredLines3);
    }

    var result = compareFilters.shift().reduce(function (res, v) {
      if (
        res.indexOf(v) === -1 &&
        compareFilters.every(function (a) {
          return a.indexOf(v) !== -1;
        })
      )
        res.push(v);
      return res;
    }, []);

    if (result.length > 0) {
      //console.log("result: "+result);
      $(result).each(function (index, value) {
        //console.log(index + " : " + value);
        finalFilteredArrayObj.push(myChartLines.data.datasets[value]);
        finalFilteredArrayIDs.push(value);
      });

      myChartLines.data.datasets = finalFilteredArrayObj;
      myChartLines.update();
    } else {
      dataLinesNotFound();
    }
    /*http://jsfiddle.net/nWjcp/4/*/

    //Apply List filters
    $("body").addClass("lines-filter-active");
    $(".list-view .item").removeClass("matched");
    $(".list-view .item").each(function (index, value) {
      var listItemID = parseInt($(value).attr("data-id"));
      if (finalFilteredArrayIDs.includes(listItemID)) {
        $(value).addClass("matched");
      }
    });
  }
}

/************************************************************************************************************/
/************************************************************************** FUNCTION: RESET BUBBLES FILTERS */
/************************************************************************************************************/
function resetLinesFilters() {
  optionsfilterLines1.length =
    optionsfilterLines2.length =
    optionsfilterLines3.length =
      0;
  applyLinesFilters();
}

function dataLinesNotFound() {
  $("body").addClass("showdatanotfound");
}

function closeLinesNotFound() {
  $("body").removeClass("showdatanotfound");
}

/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
/***************************************************************************************** GLOBAL FUNCTIONS */
/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
var menuCharts = false;
var menuInfos = false;

const swiper = new Swiper(".swiper", {
  loop: false,
  allowTouchMove: false,
});

function openMenuCharts() {
  hideTooltipLines();
  menuInfos = false;
  menuCharts = true;
  $("body").addClass("menu-charts-opened");
  $("body").removeClass("menu-infos-opened");
  $(".btn-infos").removeClass("active");
  swiper.slideTo(0);
}

function openMenuInfos() {
  hideTooltipLines();
  menuInfos = true;
  menuCharts = false;
  $("body").addClass("menu-infos-opened");
  $("body").removeClass("menu-charts-opened");
  $(".btn-infos").addClass("active");
  swiper.slideTo(1);
}

function closeMenus() {
  hideTooltipLines();
  menuInfos = false;
  menuCharts = false;
  $("body").removeClass("menu-infos-opened menu-charts-opened");
  $(".btn-infos").removeClass("active");
  return false;
}

function changeSections(myanchor, myvalue) {
  hideTooltipLines();
  $("body")
    .removeClass("keymoments loveandhate pointsbypoints")
    .addClass(myvalue);
  $("[data-anchor]").removeClass("active");
  $("[data-value=" + myvalue + "]").addClass("active");

  if (myvalue == "keymoments") {
    pageTitle = "Key Moments of Change";
  } else if (myvalue == "loveandhate") {
    pageTitle = "Love and Hate Explorer";
  } else if (myvalue == "pointsbypoints") {
    pageTitle = "Point by Point Analysis";
  }
  $(".info-menu .page-title").html(pageTitle);
  closeMenus();
  closeAllFilters();
  var target = $(myanchor);
  target = target.length ? target : $("[name=" + myanchor.slice(1) + "]");
  if (target.length) {
    $("html, body").animate(
      {
        scrollTop: target.offset().top,
      },
      750,
      "swing",
      function () {}
    );
  }
  return false;
}

function normalizeStr(string) {
  var noSpaceStr = string.replace(/\s/g, "");
  var strLowerCase = noSpaceStr.toLowerCase();
  return strLowerCase;
}

function closeAllFilters() {
  $(".dropdown-toggle").removeClass("active");
  $(".dropdown-menu, .apply-filters").css("display", "none");
  hideTooltipLines();
}

function hideTooltipLines() {
  $("#customLinesTooltip").css({
    display: "none",
  });
}

const WIDTH = 101; // 0 to 100
const HEIGHT = 1;
let context;

function initCanvas(gradientColors) {
  // gradientColors [colorA, colorB, ..]
  // Canvas
  const canvasElement = document.getElementById("colormap");
  canvasElement.width = WIDTH;
  canvasElement.height = HEIGHT;

  context = document.getElementById("colormap").getContext("2d");

  // Gradient
  const gradient = context.createLinearGradient(0, 0, WIDTH, 0);
  const step = 1 / (gradientColors.length - 1); // need to validate at least two colors in gradientColors
  let val = 0;
  gradientColors.forEach((color) => {
    gradient.addColorStop(val, color);
    val += step;
  });

  // Fill with gradient
  context.fillStyle = gradient;
  context.fillRect(0, 0, WIDTH, HEIGHT); // x, y, width, height

  return true;
}

function getColor(percent) {
  // percent [0..100]
  const color = context.getImageData(percent, 0, 1, 1); // x, y, width, height
  const rgba = color.data;

  return `rgb(${rgba[0]}, ${rgba[1]}, ${rgba[2]})`;
}

/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************ FUNCTION: POINTS BY POINTS UPDATE */
/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
var globalIndex = 0; // Define the initial position for points by points
var mainTableData = [];

function nextPoint() {
  if (finalFilteredArrayObj.length > 0) {
    var dataLength = parseInt(finalFilteredArrayObj.length);
    if (globalIndex < dataLength - 1) {
      globalIndex++;
    } else {
      globalIndex = 0;
    }
    var useThisPoint = parseInt(finalFilteredArrayObj[globalIndex].id);
  } else {
    var dataLength = parseInt(mainTableData.length);
    if (globalIndex < dataLength - 1) {
      globalIndex++;
    } else {
      globalIndex = 0;
    }
    var useThisPoint = globalIndex;
  }

  updatePoint(useThisPoint);
}

function prevPoint() {
  if (finalFilteredArrayObj.length > 0) {
    var dataLength = parseInt(finalFilteredArrayObj.length);
    if (globalIndex > 0) {
      globalIndex--;
    } else {
      globalIndex = dataLength - 1;
    }
    var useThisPoint = parseInt(finalFilteredArrayObj[globalIndex].id);
  } else {
    var dataLength = parseInt(mainTableData.length);
    if (globalIndex > 0) {
      globalIndex--;
    } else {
      globalIndex = dataLength - 1;
    }
    var useThisPoint = globalIndex;
  }

  updatePoint(useThisPoint);
}

function updatePoint(objID) {
  $("#switch-toggle-lines").prop("checked", false);
  $(".list-view").css({
    visibility: "hidden",
    "z-index": "0",
  });
  $(".lines-view").css({
    visibility: "visible",
    "z-index": "1",
  });

  var currentObjID = parseInt(objID);
  globalIndex = currentObjID; // Update globalIndex because out of next/prev functions, the user can call this function from filters.

  if (finalFilteredArrayObj.length > 0) {
    for (var i = 0; i < finalFilteredArrayObj.length; i++) {
      var loopObjID = parseInt(finalFilteredArrayObj[i].id);
      if (loopObjID === currentObjID) {
        globalIndex = i;
      }
    }

    var txtCurrPoint = finalFilteredArrayObj[globalIndex].id;
    var pointType = mainTableData[txtCurrPoint]["Point Type"];
    var pointName = mainTableData[txtCurrPoint]["Point Name"];
    var pointQuote = mainTableData[txtCurrPoint]["Quote"];
    var stakeHolders = mainTableData[txtCurrPoint]["Stakeholder"];
    var influenceR2 = mainTableData[txtCurrPoint]["Influence (R^2)"];
    var influenceR2Lay = mainTableData[txtCurrPoint]["Influence (Lay)"];
    var possibilityRMSE =
      mainTableData[txtCurrPoint]["Possibility of Change (RMSE)"];
    var possibilityRMSELay =
      mainTableData[txtCurrPoint]["Possibility of Change (Lay)"];
    var sentiment = mainTableData[txtCurrPoint]["Sentiment (Value)"];
    var sentimentLay = mainTableData[txtCurrPoint]["Sentiment (Lay)"];
    var trustFear =
      mainTableData[txtCurrPoint]["Trust / Fear Value (verbatim count mean)"];
    var trustFearLay = mainTableData[txtCurrPoint]["Trust / Fear Value (Lay)"];
    var joyAnger =
      mainTableData[txtCurrPoint]["Joy / Anger Value (verbatim count mean)"];
    var joyAngerLay = mainTableData[txtCurrPoint]["Joy  / Anger Value (Lay)"]; // This fucking column sheet title has double spaces in his namespace.
    var loveDisgust =
      mainTableData[txtCurrPoint]["Love / Disgust Value (verbatim count mean)"];
    var loveDisgustLay =
      mainTableData[txtCurrPoint]["Love  / Digust Value (Lay)"]; // This fucking column sheet title has double spaces in his namespace.
  } else {
    globalIndex = currentObjID;

    var txtCurrPoint = globalIndex;
    var pointType = mainTableData[globalIndex]["Point Type"];
    var pointName = mainTableData[globalIndex]["Point Name"];
    var pointQuote = mainTableData[globalIndex]["Quote"];
    var stakeHolders = mainTableData[globalIndex]["Stakeholder"];
    var influenceR2 = mainTableData[globalIndex]["Influence (R^2)"];
    var influenceR2Lay = mainTableData[globalIndex]["Influence (Lay)"];
    var possibilityRMSE =
      mainTableData[globalIndex]["Possibility of Change (RMSE)"];
    var possibilityRMSELay =
      mainTableData[globalIndex]["Possibility of Change (Lay)"];
    var sentiment = mainTableData[globalIndex]["Sentiment (Value)"];
    var sentimentLay = mainTableData[globalIndex]["Sentiment (Lay)"];
    var trustFear =
      mainTableData[globalIndex]["Trust / Fear Value (verbatim count mean)"];
    var trustFearLay = mainTableData[globalIndex]["Trust / Fear Value (Lay)"];
    var joyAnger =
      mainTableData[globalIndex]["Joy / Anger Value (verbatim count mean)"];
    var joyAngerLay = mainTableData[globalIndex]["Joy  / Anger Value (Lay)"]; // This fucking column sheet title has double spaces in his namespace.
    var loveDisgust =
      mainTableData[globalIndex]["Love / Disgust Value (verbatim count mean)"];
    var loveDisgustLay =
      mainTableData[globalIndex]["Love  / Digust Value (Lay)"]; // This fucking column sheet title has double spaces in his namespace.
  }

  $(".current-point").text("Point #" + txtCurrPoint);

  // Color definition for "Description" and "Quote" based on "Point Type"
  if (pointType == "Love") {
    $(".box-pointsbypoints").removeClass("hate").addClass("love");
  } else if (pointType == "Hate") {
    $(".box-pointsbypoints").removeClass("love").addClass("hate");
  }

  // Content for "Description" based on "Point Name"
  $(".description p").text(pointName);

  // Content for "Quote" based on "Quote"
  $(".cite p").text(pointQuote);

  // Header icons definition
  let singleStakeholder = stakeHolders;
  stakeholderArray = singleStakeholder.split(/\s+/);
  $(".points-data-header img").css("display", "none");
  $(stakeholderArray).each(function (index, value) {
    var stakeHoldersStr = value.replace(/,/g, "");
    $("." + stakeHoldersStr).css("display", "inline-block");
  });

  // Influence (R^2)
  $(".points-data-body .item:nth-child(1) .val-0").text(influenceR2);
  if (influenceR2Lay == "Low" || influenceR2Lay == "Medium Low") {
    $(".points-data-body .item:nth-child(1) .val-1")
      .removeClass("color-green")
      .addClass("color-pink");
  } else if (influenceR2Lay == "Medium High" || influenceR2Lay == "High") {
    $(".points-data-body .item:nth-child(1) .val-1")
      .removeClass("color-pink")
      .addClass("color-green");
  } else {
    $(".points-data-body .item:nth-child(1) .val-1").removeClass(
      "color-pink color-green"
    );
  }
  $(".points-data-body .item:nth-child(1) .val-1").text(influenceR2Lay);

  // Possibility of Change (RMSE)
  $(".points-data-body .item:nth-child(2) .val-0").text(possibilityRMSE);
  if (possibilityRMSELay == "Low" || possibilityRMSELay == "Medium Low") {
    $(".points-data-body .item:nth-child(2) .val-1")
      .removeClass("color-green")
      .addClass("color-pink");
  } else if (
    possibilityRMSELay == "Medium High" ||
    possibilityRMSELay == "High"
  ) {
    $(".points-data-body .item:nth-child(2) .val-1")
      .removeClass("color-pink")
      .addClass("color-green");
  } else {
    $(".points-data-body .item:nth-child(2) .val-1").removeClass(
      "color-pink color-green"
    );
  }
  $(".points-data-body .item:nth-child(2) .val-1").text(possibilityRMSELay);

  // Sentiment
  $(".points-data-body .item:nth-child(3) .val-0").text(sentiment);
  if (sentimentLay == "Low" || sentimentLay == "Medium Low") {
    $(".points-data-body .item:nth-child(3) .val-1")
      .removeClass("color-green")
      .addClass("color-pink");
  } else if (sentimentLay == "Medium High" || sentimentLay == "High") {
    $(".points-data-body .item:nth-child(3) .val-1")
      .removeClass("color-pink")
      .addClass("color-green");
  } else {
    $(".points-data-body .item:nth-child(3) .val-1").removeClass(
      "color-pink color-green"
    );
  }
  $(".points-data-body .item:nth-child(3) .val-1").text(sentimentLay);

  // Trust / Fear
  $(".points-data-body .item:nth-child(4) .val-0").text(trustFear);
  if (trustFearLay == "Low" || trustFearLay == "Medium Low") {
    $(".points-data-body .item:nth-child(4) .val-1")
      .removeClass("color-green")
      .addClass("color-pink");
    $(".points-data-body .item:nth-child(4) .prop").text("Fear:");
  } else if (trustFearLay == "Medium High" || trustFearLay == "High") {
    $(".points-data-body .item:nth-child(4) .val-1")
      .removeClass("color-pink")
      .addClass("color-green");
    $(".points-data-body .item:nth-child(4) .prop").text("Trust:");
  } else {
    $(".points-data-body .item:nth-child(4) .val-1").removeClass(
      "color-pink color-green"
    );
    $(".points-data-body .item:nth-child(4) .prop").text("Trust / Fear:");
  }
  $(".points-data-body .item:nth-child(4) .val-1").text(trustFearLay);

  // Joy / Anger
  $(".points-data-body .item:nth-child(5) .val-0").text(joyAnger);
  if (joyAngerLay == "Low" || joyAngerLay == "Medium Low") {
    $(".points-data-body .item:nth-child(5) .val-1")
      .removeClass("color-green")
      .addClass("color-pink");
    $(".points-data-body .item:nth-child(5) .prop").text("Anger:");
  } else if (joyAngerLay == "Medium High" || joyAngerLay == "High") {
    $(".points-data-body .item:nth-child(5) .val-1")
      .removeClass("color-pink")
      .addClass("color-green");
    $(".points-data-body .item:nth-child(5) .prop").text("Joy:");
  } else {
    $(".points-data-body .item:nth-child(5) .val-1").removeClass(
      "color-pink color-green"
    );
    $(".points-data-body .item:nth-child(5) .prop").text("Joy / Anger:");
  }
  $(".points-data-body .item:nth-child(5) .val-1").text(joyAngerLay);

  // Love / Disgust
  $(".points-data-body .item:nth-child(6) .val-0").text(loveDisgust);
  if (loveDisgustLay == "Low" || loveDisgustLay == "Medium Low") {
    $(".points-data-body .item:nth-child(6) .val-1")
      .removeClass("color-green")
      .addClass("color-pink");
    $(".points-data-body .item:nth-child(6) .prop").text("Disgust:");
  } else if (loveDisgustLay == "Medium High" || loveDisgustLay == "High") {
    $(".points-data-body .item:nth-child(6) .val-1")
      .removeClass("color-pink")
      .addClass("color-green");
    $(".points-data-body .item:nth-child(6) .prop").text("Love:");
  } else {
    $(".points-data-body .item:nth-child(6) .val-1").removeClass(
      "color-pink color-green"
    );
    $(".points-data-body .item:nth-child(6) .prop").text("Love / Disgust:");
  }
  $(".points-data-body .item:nth-child(6) .val-1").text(loveDisgustLay);

  return true;
}

/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************** FUNCTION: PRELOADER */
/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
function preloaderRemove() {
  $(".hateaudit-spinner").remove();
}

function preloaderClose() {
  $("body").removeClass("preloader");
  var removePreloader = setTimeout(preloaderRemove, 1500);
}

function preloaderExit() {
  var closePreloader = setTimeout(preloaderClose, 2000);
}

/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
/******************************************************************************************* DOCUMENT READY */
/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
$(function () {
  $("button.hamburger").on("click", function (e) {
    e.preventDefault();
    if (menuCharts == false) {
      openMenuCharts();
    } else {
      closeMenus();
    }
  });

  $("button.btn-infos").on("click", function (e) {
    e.preventDefault();
    if (menuInfos == false) {
      openMenuInfos();
    } else {
      closeMenus();
    }
  });

  $("button.close-points").on("click", function (e) {
    e.preventDefault();
    changeSections("#LoveandHatePointsExplorer", "loveandhate");
  });

  $("button.next").on("click", function (e) {
    e.preventDefault();
    nextPoint();
  });

  $("button.prev").on("click", function (e) {
    e.preventDefault();
    prevPoint();
  });

  $("[data-anchor]").on("click", function (e) {
    e.preventDefault();
    var myanchor = $(this).attr("data-anchor");
    var myvalue = $(this).attr("data-value");
    changeSections(myanchor, myvalue);
  });

  $("canvas").each(function (i, el) {
    $(el).attr({
      width: $(el).parent().width(),
      height: $(el).parent().outerHeight(),
    });
  });

  $("header").on("mouseenter", function (e) {
    e.preventDefault();
    hideTooltipLines();
  });

  $("canvas").on("mouseleave", function (e) {
    e.preventDefault();
    if ($("#customLinesTooltip:hover").length == 0) {
      hideTooltipLines();
    }
  });

  $("#switch-toggle-lines").click(function () {
    var $switchToggleLines = $('label[for="' + this.id + '"]');
    if ($(this).is(":checked")) {
      $(".lines-view").css({
        visibility: "hidden",
        "z-index": "0",
      });
      $(".list-view").css({
        visibility: "visible",
        "z-index": "1",
      });
    } else {
      $(".list-view").css({
        visibility: "hidden",
        "z-index": "0",
      });
      $(".lines-view").css({
        visibility: "visible",
        "z-index": "1",
      });
    }
  });

  changeSections("#KeyMomentsofChange", "keymoments");
  //changeSections('#LoveandHatePointsExplorer', 'loveandhate');
  //changeSections('#LoveandHatePointsExplorer', 'pointsbypoints');
});

/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
/********************************************************************************************** WINDOW LOAD */
/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
$(window).on("load", function (e) {
  initCanvas(["#2ad3ae", "#2ad3ae", "#38d6ae", "#fb4091", "#fb4091"]);

  getJSONData();
});

/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
/******************************************************************************************** WINDOW RESIZE */
/************************************************************************************************************/
/************************************************************************************************************/
/************************************************************************************************************/
var resizeTimer;

$(window).on("resize", function (e) {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    location.reload();
  }, 250);
});
