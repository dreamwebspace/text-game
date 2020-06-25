const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Wejście do podziemi jest szerokie, obrośnięte trawą i bujnymi krzewami. Poprawiasz ubranie i ekwipunek. Zapalasz latarnię. Wchodzisz do korytarza. Jest wysoki, nie musisz się schylać. Prowadzi prosto na północ. Wkrótce dochodzisz do skrzyżowania. Ma ono kształt litery T. Odnogi prowadzą na zachód, wschód i południe (skąd przyszedłeś).',

    options: [
      {
        text: 'Dalej',
        nextText: 25
      }
    ]
  },
  {
    id: 25,
    text: 'Na kamieniu siedzi stary człowiek. Radzi ci iść na zachód, a później na kiIku najbliższych skrzyżowaniach skręcać w prawo.',
    options: [
      {
        text: 'Idziesz na zachód',
        nextText: 200
      },
      {
        text: 'Wybierasz drogę prowadzącą na wschód',
        nextText: 44
      }
    ]
  },
  {
    id: 200,
    text: 'Po pewnym czasie dostrzegasz drzwi w południowej ścianie korytarza (drzwi, przez które nie przechodziłeś, są zamknięte. Wyjątki opisane są w tekście).',
    options: [
      {
        text: 'Drzwi otwarte',
        nextText: 120
      },
      {
        text: 'Drzwi zamkniętę',
        nextText: 301
      },
    ]
  },
  {
    id: 120,
    text: 'Idziesz na zachód. Korytarz łagodnie skręca w prawo i teraz juz prowadzi na północ. Widzisz przed sobą skrzyżowanie.',
    options: [
      {
        text: 'Dalej',
        nextText: 64
      }
    ]
  },
  {
    id: 301,
    text: '',
    options: [
      {
        text: 'Próbujesz otworzyć drzwi',
        nextText: 364
      },
      {
        text: 'Rezygnujesz',
        nextText: 120
      }
    ]
  },
  {
    id: 44,
    text: 'Idziesz na wschód. Widzisz przed sobą solidne drzwi. Próbujesz je otworzyć. Nie ustępują.',
    options: [
      {
        text: 'Rezygnujesz',
        nextText: 75
      },
      {
        text: 'Próbujesz wyważyć drzwi',
        nextText: 105
      }
    ]
  },
  {
    id: 364,
    text: 'Popychasz drzwi, uchylają się. Otwiera się ciemna czeluść. Wchodzisz oświetlając drogę latarnią. Pod stopami czujesz kamyki. Z przeciwległego końca pokoju dochodzi ciche chrapanie. Idziesz w tamtym kierunku. Na podłodze śpi ork. Obok niego leży jakieś pudełko.',
    options: [
      {
        text: 'Próbujesz zabrać ukradkiem pudełko',
        nextText: 29
      },
      {
        text: 'Decydujesz się podjąć walkę',
       // requiredState: (currentState) => currentState.sword,
        nextText: 116
      }
    ]
  },
  {
    id: 999,
    text: 'Your attempts to run are in vain and the monster easily catches.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 64,
    text: 'Zbliżasz się do skrzyżowania. Możesz iść w każdym z czterech kierunków.',
    options: [
      {
        text: 'Na zachód',
        nextText: 296
      },
      {
        text: 'Na północ',
        nextText: 264
      },
      {
        text: 'Na wschód',
        nextText: 284
      },
      {
        text: 'Na południe',
        nextText: 224
      }
    ]
  },
  {
    id: 75,
    text: 'Wycofujesz się. Wracasz w stronę skrzyżowania. Mijasz starca.',
    options: [
      {
        text: 'Dalej',
        nextText: 200
      }
    ]
  },
  {
    id: 105,
    text: 'Próbuiesz wyważyć drzwi. Rozpędzasz się i z całej siły uderzasz barkiem. Drzwi ani drgnęły: - 1 W $$$$$$$$$$$$$. Czy chcesz ponowic próbę?',
    options: [
      {
        text: 'Tak',
        nextText: 56
      },
      {
        text: 'Nie',
        nextText: 75
      }
    ]
  }
]

startGame()