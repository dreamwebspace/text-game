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
    id: 7,
    text: 'While exploring the castle you come across a horrible monster in your path.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack it with your sword',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Throw the blue goo at it',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain and the monster easily catches.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought this monster could be slain with a single sword.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your shield and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()