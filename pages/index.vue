 <script setup lang="ts">
 
 </script>
 
 <template>
    <div class="template-container">
        <div class="d-flex justify-content-center pt-5 pb-5">
            <h2>Choose a brand</h2>
        </div>
        <div class="container">
            <div class="row pt-2 pb-2">
                <div class="col">
                    <p>Acura</p>
                    <p>Alfa Romeo</p>
                    <p>Audi</p>
                    <NuxtLink class="text-decoration-none text-dark brand-link fw-bold" to="/bmw" >BMW</NuxtLink>
                    <p>Buick</p>
                    <p>Cadillac</p>
                    <p>Chevrolet</p>
                    <p>Chrysler</p>
                    <p>Dodge</p>
                </div>
                <div class="col">
                    <p>Fiat</p>
                    <p>Ford</p>
                    <p>GMC</p>
                    <NuxtLink class="text-decoration-none text-dark brand-link fw-bold" to="/bmw" >Honda</NuxtLink>
                    <p>Hyundai</p>
                    <p>Infinity</p>
                    <p>Jaguar</p>
                    <p>Jeep</p>
                    <p>Kia</p>
                </div>
                <div class="col">
                    <p>Land Rover</p>
                    <p>Lexus</p>
                    <p>Lincoln</p>
                    <NuxtLink class="text-decoration-none text-dark brand-link fw-bold" to="/bmw" >Maserati</NuxtLink>
                    <p>Mazda</p>
                    <p>Mercedes-Benz</p>
                    <p>MINI</p>
                    <p>Mitsubishi</p>
                    <p>Nissan</p>
                </div>
                <div class="col">
                    <p>Nissan</p>
                    <p>Porsche</p>
                    <p>RAM</p>
                    <NuxtLink class="text-decoration-none text-dark brand-link fw-bold" to="/bmw" >Scion</NuxtLink>
                    <p>Subaru</p>
                    <p>Toyota</p>
                    <p>Volkwagen</p>
                    <p>Volvo</p>
                </div>
            </div>
        </div>
    </div>
</template>
 
 <style scoped>
 .template-container
 {
    height: 75vh;
 }

 p, .brand-link {
    display: block;
    margin: 0.5em 0;
 }
 </style>