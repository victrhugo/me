# 🚀 Guia de Deploy - Portfólio Neon Fire

## ✅ Projeto Configurado!

Seu portfólio já está com o tema **Neon Fire** 🔥 aplicado e pronto para deploy!

---

## 🆓 Deploy GRATUITO na Vercel (Recomendado)

### Por que Vercel?
- ✅ **100% GRÁTIS** para projetos pessoais
- ✅ Deploy automático a cada push no GitHub
- ✅ SSL/HTTPS grátis
- ✅ Domínio grátis: `seu-nome.vercel.app`
- ✅ Pode adicionar domínio customizado depois
- ✅ Detecta Next.js automaticamente

---

## 📋 Passo a Passo - Deploy na Vercel

### 1️⃣ Preparar o GitHub
```bash
# Se ainda não criou um repositório:
git init
git add .
git commit -m "🔥 Portfolio com tema Neon Fire"

# Criar repositório no GitHub e depois:
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git branch -M main
git push -u origin main
```

### 2️⃣ Deploy na Vercel
1. Acesse: https://vercel.com/signup
2. Clique em **"Continue with GitHub"**
3. Autorize o Vercel a acessar seus repositórios
4. Clique em **"Import Project"**
5. Selecione o repositório do seu portfólio
6. Vercel detecta Next.js automaticamente ✨
7. Clique em **"Deploy"**
8. Aguarde 1-2 minutos... **PRONTO!** 🎉

### 3️⃣ Atualizações Automáticas
Toda vez que você fizer `git push`, a Vercel faz deploy automaticamente! 🚀

---

## 🌐 Outras Opções Gratuitas

### Netlify
1. https://netlify.com
2. Conecte com GitHub
3. Deploy automático
4. Domínio grátis: `seu-nome.netlify.app`

### Cloudflare Pages
1. https://pages.cloudflare.com
2. Conecte com GitHub
3. Super rápido (CDN global)
4. Domínio grátis: `seu-nome.pages.dev`

---

## 🎨 Personalizações Futuras

### Trocar Cores
Edite: `src/app/globals.css` (linhas 6-62)

### Adicionar Conteúdo
- **Projetos**: `src/data/projects.ts`
- **Artigos**: `src/data/articles.ts`
- **Palestras**: `src/data/talks.ts`
- **Experiência**: `src/data/experience.ts`

### Trocar Fotos
Coloque suas imagens em: `public/`

---

## 🔧 Comandos Úteis

```bash
# Rodar localmente
npm run dev

# Buildar para produção (testar antes do deploy)
npm run build

# Rodar versão de produção localmente
npm run start
```

---

## 💡 Dicas

1. **Domínio Customizado**: Na Vercel você pode adicionar seu próprio domínio (ex: `seusite.com`)
2. **Analytics**: Vercel tem analytics grátis
3. **Preview Deploys**: Cada branch/PR gera uma URL de preview
4. **Variáveis de Ambiente**: Configure na dashboard da Vercel se precisar

---

## 🆘 Problemas Comuns

### Build falhou?
```bash
# Teste localmente primeiro:
npm run build

# Se funcionar local, funciona na Vercel!
```

### Erro de dependências?
```bash
# Limpe e reinstale:
rm -rf node_modules package-lock.json
npm install
```

---

## 🔥 Seu Portfolio está Pronto!

Agora é só:
1. Fazer push pro GitHub
2. Conectar na Vercel
3. Compartilhar seu link! 🎉

**Boa sorte com seu portfólio Neon Fire!** 🔥

