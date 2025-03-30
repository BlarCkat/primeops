export interface Module {
    id: number;
    title: string;
    color: 'blue' | 'amber' | 'green' | 'gray';
    iconSrc?: string;
    locked: boolean;
    questions: Question[];
  }
  
  export interface Question {
    id: number;
    title: string;
    content: string;
    example?: string;
  }
  
  // Module data based on the screenshot
  export const moduleData: Module[] = [
    { 
      id: 1,
      title: "What is Income?",
      color: 'blue', 
      iconSrc: '/img/module-1.svg',
      locked: false,
      questions: [
        {
          id: 1,
          title: "What is Income?",
          content: "In the financial world, we regularly get money from work or investments. It's the incoming resources, whether it's from our job or smart choices in investments.",
          example: "Example: Think of the money you receive every month as your salary or from the investments you made."
        },
        {
          id: 2,
          title: "Why Income Matters",
          content: "Hello! Your 'who's who' about income – an important part of managing money. Let's check out the kinds of income and why they matter in planning our finances.",
          example: "Income is like fuel for your financial engine, helping you move toward your goals."
        }
      ]
    },
    { 
      id: 2,
      title: "Earned Income: Money for Working",
      color: 'amber', 
      iconSrc: '/img/module-2.svg',
      locked: false,
      questions: [
        {
          id: 1,
          title: "Earned Income: Money for Working",
          content: "Earned income is the money we get for working. It could be the money we make each week or the monthly salary we receive for our full-time job.",
          example: "Example: Your weekly pay or the regular monthly salary you get from your employer."
        }
      ]
    },
    { 
      id: 3,
      title: "Passive Income: Money Without Working Every Day",
      color: 'green', 
      iconSrc: '/img/module-3.svg',
      locked: false,
      questions: [
        {
          id: 1,
          title: "Passive Income: Money Without Working Every Day",
          content: "Passive income is money that comes in without us actively working every day. This includes earnings from investments, renting out property, or receiving dividends.",
          example: "Example: The money coming in from your investments or renting out a room without you having to do much."
        }
      ]
    },
    { 
      id: 4,
      title: "Portfolio Income: Gains from Investments",
      color: 'blue', 
      iconSrc: '/img/module-1.svg',
      locked: false,
      questions: [
        {
          id: 1,
          title: "Portfolio Income: Gains from Investments",
          content: "Portfolio income is the money we make from our investments. This type of passive income includes the profits we get from selling these investments and dividends.",
          example: "Example: When your investments, like stocks, make money or pay you dividends, that's your portfolio income."
        }
      ]
    },
    { 
      id: 5,
      title: "Business Income: Profits After Expenses",
      color: 'blue', 
      iconSrc: '/img/module-3.svg',
      locked: false,
      questions: [
        {
          id: 1,
          title: "Business Income: Profits After Expenses",
          content: "In the business world, income is not just the money a business makes. It's the profit left over after subtracting all the expenses. It's about first making money, and then after taking away all the costs, seeing what remains as profit.",
          example: "Example: A coffee shop makes $5000 in sales but spent $3000 on rent, coffee beans, and staff. The profit (income) is $2000."
        }
      ]
    },
    { 
      id: 6,
      title: "Module 6",
      color: 'gray',
      locked: true,
      questions: []
    },
    { 
      id: 7,
      title: "Module 7",
      color: 'gray',
      locked: true,
      questions: []
    },
  ];
  