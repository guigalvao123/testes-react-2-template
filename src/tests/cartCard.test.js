import { render, screen } from "@testing-library/react"
import CartCard from "../components/Cart/CartCard"
import userEvent from "@testing-library/user-event"

const cardMock = {
    id: 1,
    image: "https://imagem.jpg",
    title: "Cart Teste",
    price: 1000,
    quantity: 10,
}

const removeFromCartMock = jest.fn()

// TESTES
describe("Cart Card", () => {
    test("Renderizar card no cart", () => {
        render(<CartCard product={cardMock} removeFromCart={removeFromCartMock} />)

        const cart = screen.getByText("Cart Teste")
        expect(cart).toBeInTheDocument
    })
    test("Renderizar, imagem, titutlo, preco e quantidade e o botao de remover.",()=>{
        render(<CartCard product={cardMock} removeFromCart={removeFromCartMock} />)

        const image = screen.getByRole('img', {name: /cart teste/i})
        const title = screen.getByRole('heading', {name: /cart teste/i})
        const price = screen.getByText(/\$1000\.00/i)
        const quantity = screen.getByText(/x10/i)
        const removeBtn = screen.getByRole('button', {name: /remove/i})
        //screen.logTestingPlaygroundURL()

        expect(title).toBeInTheDocument()
        expect(image).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(quantity).toBeInTheDocument()
        expect(removeBtn).toBeInTheDocument()
    })
    test("Testar quando o botao de remover for clicado, remova o produto do carrinho.", async () => {

        const user = userEvent.setup()
        render(<CartCard product={cardMock} removeFromCart={removeFromCartMock} />)
        
        const removeBtn = screen.getByRole('button', {name: /remove/i})

        await user.click(removeBtn)
        expect(removeFromCartMock).toBeCalled()
    })
})
