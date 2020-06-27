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
       //TODO
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
    text: 'Próbujesz wyważyć drzwi. Rozpędzasz się i z całej siły uderzasz barkiem. Drzwi ani drgnęły. Czy chcesz ponowic próbę?',
    //TODO -1w
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
  },
  {
    id: 296,
    text: 'Korytarz biegnie na zachód i skręca na północ. Na zakręcie możesz zjeść prowiant. Idziesz dalej. Przed sobę widzisz skrzyżownie.',
    options: [
      {
        text: 'Dalej',
        nextText: 39
      }
    ]
  },
  {
    id: 264,
    text: 'Trudno przejść przez to zwalisko kamieni. Na szczęście korytarz nie wije się we wszystkie strony, lecz prowadzi prosto na północ.',
    options: [
      {
        text: 'Dalej',
        nextText: 102
      }
    ]
  },
  {
    id: 284,
    text: 'Korytarz jest coraz węższy. Ze sklepienia zwisają długie kamienne brody. Moga lada chwila urwać się. SSS. Jeśli masz $$$SZCZESCIE - wszystko w porzqdku. Jeśli nie masz SZCZZZZZ minus 2 W.',
    //TODO SSS
    options: [
      {
        text: 'Dalej',
        nextText: 50
      }
    ]
  },
  {
    id: 224,
    text: 'Po kilkunastu krokach korytarz skręca na wschód. Idziesz dalej. W południowe ścianie korytarza dostrzegasz drzwi.',
    options: [
      {
        text: 'Drzwi są otwarte',
        nextText: 180
      },
      {
        text: 'Drzwi są zamknięte',
        nextText: 301
      }
    ]
  },
  {
    id: 180,
    text: 'Ponownie przeszukujesz pokój. W torbie orka, której nie zdążyłeś przejrzec, znajdujesz klucz. Jest na nim wygrawerowana liczba 45. Bierzesz go wziqc ze sobą. $$$$Wpisz klucz na swoją Listę ekwipunku. Nie zapomnij o zapisaniu liczby podanej na kluczu. Wychodzisz z komnaty pozostawiając drzwi otwarte.',
    //TODO ekwipunek
    options: [
      {
        text: 'Dalej',
        nextText: 120
      }
    ]
  },
  {
    id: 50,
    text: 'Zbliżasz się do skrzyżowania. Możesz iść na:',
    options: [
      {
        text: 'Północ',
        nextText: 310
      },
      {
        text: 'Wschód',
        nextText: 130
      },
      {
        text: 'Zachód',
        nextText: 64
      }
    ]
  },
  {
    id: 310,
    text: 'Tylko dziesięc kroków dzieli cię od zmurszałych drewnianych drzwi. Czy byłeś juz za nimi?',
    options: [
      {
        text: 'Tak',
        nextText: 67
      },
      {
        text: 'Nie',
        nextText: 17
      }
    ]
  },
  {
    id: 130,
    text: 'Korytarz ma teraz prawie pięc kroków szerokości. Idziesz więc wygodnie. Prostuiesz kości. Przeszedłeś zaledwie sto kroków, a tu następne skrzyżowanie.',
    options: [
      {
        text: 'Dalej',
        nextText: 212
      }
    ]
  },
]

startGame()