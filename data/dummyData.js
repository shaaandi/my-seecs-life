export default async () => {
  let courses = [
    {
      id: "HU101",
      courseCode: "HU101",
      title: "Islamic Studies BESE-10 AB -- (Fall'19)",
      instructor: "Prof. Noman Aijaz",
      classTimmings: "Tu#0900-0950+Mo#1500-1550"
    },
    {
      id: "CS114",
      courseCode: "CS114",
      title: "Fundamental of Programming BESE-10 AB -- (Fall'19)",
      instructor: "Miss Hania Aslam",
      classTimmings: "We#1000-1050+Th#1100-1150"
    },
    {
      id: "MATH161",
      courseCode: "MATH161",
      title: "Discrete Mathematics BESE-10 AB -- (Fall'19)",
      instructor: "Prof. Moin ud Din",
      classTimmings: "Mo#1100-1150+We#1200-1250+Th#1400-1450"
    },
    {
      id: "PHY102",
      title: "Applied Physics BESE-10 AB -- (Fall'19)",
      instructor: "Mujahid Ali",
      classTimmings: "Tu#1000-1050+Fr#1100-1150",
      courseCode: "PHY102"
    },
    {
      id: "MATH101",
      title: "Calculus And Analytical Geometry",
      instructor: "Mr: Wajahat Ali",
      classTimmings: "Mo#1000-1050+We#1100-1150+Th#1200-1250",
      courseCode: "MATH101"
    },
    {
      id: "HU100",
      title: "English and Communication Skills",
      instructor: "Maam Idika Roy",
      classTimmings: "Mo#1600-1650+Th#1600-1650+Fr#1600-1700",
      courseCode: "HU100"
    }
  ];

  let assignments = await [
    {
      id: "1",
      courseCode: "HU101",
      title: "Eassy Writting : Life of Muslims in Modern Society",
      dueDate: "1/12/2019",
      dateGiven: "15/11/2019"
    },
    {
      id: "3",
      courseCode: "MATH101",
      title: "Integration Questions",
      dateGiven: "19/11/2019",
      dueDate: "5/12/2019"
    },
    {
      id: "2",
      courseCode: "MATH161",
      title: "Application of Derivates : Optimiztion",
      dueDate: "26/11/2019",
      dateGiven: "18/11/2019"
    },
    {
      id: "4",
      courseCode: "CS114",
      title: "Atm Machine Encryption Code : Big O",
      dueDate: "23/11/2019",
      dateGiven: "20/11/2019"
    },
    {
      id: "5",
      courseCode: "HU100",
      title: "Speaking Skills : Submiting report",
      dueDate: "24/11/2019",
      dateGiven: "19/11/2019"
    },
    {
      id: "6",
      courseCode: "HU100",
      title: "Speaking Skills : Evauating others' report",
      dueDate: "25/11/2019",
      dateGiven: "21/11/2019"
    },
    {
      id: "7",
      courseCode: "HU100",
      title: "OHT 2 : Self report submission",
      dueDate: "30/11/2019",
      dateGiven: "27/11/2019"
    }
  ];

  return {
    courses,
    assignments
  };
};
