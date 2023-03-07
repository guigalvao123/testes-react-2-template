import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ProductCard from "../components/ProductsList/ProductCard"

// MOCK (PODERIA ESTAR EM ARQUIVO SEPARADO.)

const productMock = {
    image: "https://imagem.jpg",
    title: "Produto Teste",
    price: 1000
}

const addToCartMock = jest.fn()

// TESTES
describe("Products Card", () => {

    //Pratica Guiada 1
    test("Renderizar card de produto", () => {
        render(<ProductCard product={productMock} addToCart={addToCartMock} />)

        const card = screen.getByText("Produto Teste")
        expect(card).toBeInTheDocument
    })
    //Pratica Guiada 2
    test("Deve renderizar titulo, imagem, preco e botao de compra", () => {
        render(<ProductCard product={productMock} addToCart={addToCartMock} />)

        const title = screen.getByRole('heading', { name: /produto teste/i })
        const img = screen.getByRole('img', { name: /produto teste/i })
        const price = screen.getByText(/\$1000\.00/i)
        const addBtn = screen.getByRole('button', {name: /buy/i})
        //screen.logTestingPlaygroundURL()

        expect(title).toBeInTheDocument()
        expect(img).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(addBtn).toBeInTheDocument()
    })

    // Pratica Guiada 3
    test("Testar quando o botao de comprar for clicado, adicione o produto ao carrinho.", async ()=>{
        
        const user = userEvent.setup()

        render(<ProductCard product={productMock} addToCart={addToCartMock} />)

        const addBtn = screen.getByRole('button', {name: /buy/i})

        await user.click(addBtn)
        await user.click(addBtn)

        // como estou utilizando jest.fn(), posso usar metodos especiais de verificar se a funcao esta funcionando.
        expect(addToCartMock).toBeCalledTimes(2)

    })
})